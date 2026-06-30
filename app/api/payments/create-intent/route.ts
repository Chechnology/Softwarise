import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createEscrowPayment, createPaymentIntent, createOrRetrieveCustomer } from '@/lib/stripe';
import { z } from 'zod';

const paymentSchema = z.object({
  amount: z.coerce.number().positive(),
  type: z.enum(['listing_sale', 'investment', 'project_payment', 'milestone_release', 'subscription']),
  reference_id: z.string().uuid().optional(),
  description: z.string(),
  to_user_id: z.string().uuid().optional(),
  use_escrow: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = paymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Invalid input' }, { status: 400 });
  }

  const { data: userData } = await supabase
    .from('users')
    .select('email, full_name, stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (!userData) {
    return NextResponse.json({ data: null, error: 'User not found' }, { status: 404 });
  }

  try {
    let customerId = userData.stripe_customer_id;

    if (!customerId) {
      const customer = await createOrRetrieveCustomer(userData.email, userData.full_name || '');
      customerId = customer.id;
      await supabase.from('users').update({ stripe_customer_id: customerId }).eq('id', user.id);
    }

    const paymentIntent = parsed.data.use_escrow
      ? await createEscrowPayment({
          amount: parsed.data.amount,
          fromCustomerId: customerId,
          description: parsed.data.description,
          metadata: {
            type: parsed.data.type,
            reference_id: parsed.data.reference_id || '',
            from_user_id: user.id,
          },
        })
      : await createPaymentIntent({
          amount: parsed.data.amount,
          metadata: {
            type: parsed.data.type,
            reference_id: parsed.data.reference_id || '',
            from_user_id: user.id,
          },
        });

    // Record transaction
    const platformFee = parsed.data.use_escrow ? parsed.data.amount * 0.05 : 0;

    await supabase.from('transactions').insert({
      type: parsed.data.type,
      status: 'pending',
      amount: parsed.data.amount,
      platform_fee: platformFee,
      net_amount: parsed.data.amount - platformFee,
      from_user_id: user.id,
      to_user_id: parsed.data.to_user_id || null,
      reference_id: parsed.data.reference_id || null,
      stripe_payment_intent_id: paymentIntent.id,
      description: parsed.data.description,
    });

    return NextResponse.json({
      data: { client_secret: paymentIntent.client_secret, payment_intent_id: paymentIntent.id },
      error: null,
    });
  } catch (err) {
    console.error('Payment creation error:', err);
    return NextResponse.json({ data: null, error: 'Payment creation failed' }, { status: 500 });
  }
}

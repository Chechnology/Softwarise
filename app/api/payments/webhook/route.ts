import { NextRequest, NextResponse } from 'next/server';
import { stripe, constructWebhookEvent } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/server';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, sig);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createAdminClient();

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await supabase
        .from('transactions')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await supabase
        .from('transactions')
        .update({ status: 'failed' })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (user) {
        const plan = subscription.items.data[0]?.price.lookup_key?.includes('enterprise')
          ? 'enterprise'
          : 'pro';

        await supabase
          .from('subscriptions')
          .upsert({
            user_id: user.id,
            plan,
            status: subscription.status === 'active' ? 'active' : subscription.status,
            stripe_subscription_id: subscription.id,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          }, { onConflict: 'user_id' });

        await supabase
          .from('profiles')
          .update({ subscription_tier: plan })
          .eq('user_id', user.id);
      }

      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (user) {
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled', plan: 'free' })
          .eq('user_id', user.id);

        await supabase
          .from('profiles')
          .update({ subscription_tier: 'free' })
          .eq('user_id', user.id);
      }

      break;
    }

    case 'transfer.created': {
      const transfer = event.data.object as Stripe.Transfer;

      await supabase
        .from('transactions')
        .update({ stripe_transfer_id: transfer.id })
        .eq('stripe_payment_intent_id', transfer.source_transaction as string);

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export const runtime = 'nodejs';

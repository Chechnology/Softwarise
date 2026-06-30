import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendOfferReceivedEmail } from '@/lib/resend';
import { formatCurrency } from '@/lib/utils';
import { z } from 'zod';

const offerSchema = z.object({
  listing_id: z.string().uuid(),
  amount: z.coerce.number().positive(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = offerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Invalid input' }, { status: 400 });
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('*, seller:users(id, email, full_name)')
    .eq('id', parsed.data.listing_id)
    .single();

  if (!listing) {
    return NextResponse.json({ data: null, error: 'Listing not found' }, { status: 404 });
  }

  const { data: offer, error } = await supabase
    .from('offers')
    .insert({
      listing_id: parsed.data.listing_id,
      buyer_id: user.id,
      amount: parsed.data.amount,
      message: parsed.data.message || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  // Increment offers count
  await supabase
    .from('listings')
    .update({ offers_count: (listing.offers_count || 0) + 1 })
    .eq('id', parsed.data.listing_id);

  // Notify seller
  await supabase.from('notifications').insert({
    user_id: listing.seller_id,
    type: 'offer_received',
    title: 'New offer received',
    body: `You received an offer of ${formatCurrency(parsed.data.amount)} on "${listing.title}"`,
    action_url: `/listings/${listing.id}/offers`,
  });

  // Send email
  if (listing.seller?.email) {
    try {
      await sendOfferReceivedEmail({
        to: listing.seller.email,
        sellerName: listing.seller.full_name || 'there',
        listingTitle: listing.title,
        offerAmount: formatCurrency(parsed.data.amount),
        buyerName: user.user_metadata?.full_name || 'A buyer',
        offerUrl: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}/offers`,
      });
    } catch (err) {
      console.error('Failed to send offer email:', err);
    }
  }

  return NextResponse.json({ data: offer, error: null, message: 'Offer submitted' });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listing_id');

  let query = supabase.from('offers').select('*, buyer:users(full_name, avatar_url)');

  if (listingId) {
    query = query.eq('listing_id', listingId);
  } else {
    query = query.eq('buyer_id', user.id);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

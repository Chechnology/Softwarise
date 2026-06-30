import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('listings')
    .select('*, seller:users(full_name, avatar_url), assets:listing_assets(*)')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ data: null, error: 'Listing not found' }, { status: 404 });
  }

  // Increment view count (fire and forget)
  supabase
    .from('listings')
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq('id', id)
    .then();

  return NextResponse.json({ data, error: null });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('seller_id')
    .eq('id', id)
    .single();

  if (!listing || listing.seller_id !== user.id) {
    return NextResponse.json({ data: null, error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const allowedFields = [
    'title', 'short_description', 'description', 'asking_price',
    'monthly_revenue', 'monthly_profit', 'tech_stack', 'country',
    'demo_url', 'status',
  ];
  const updates = Object.fromEntries(
    Object.entries(body).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('seller_id')
    .eq('id', id)
    .single();

  if (!listing || listing.seller_id !== user.id) {
    return NextResponse.json({ data: null, error: 'Forbidden' }, { status: 403 });
  }

  const { error } = await supabase.from('listings').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: null, error: null, message: 'Listing deleted' });
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils';
import { z } from 'zod';

const createListingSchema = z.object({
  title: z.string().min(3).max(200),
  category: z.enum([
    'saas', 'mobile_app', 'website', 'domain', 'software_business',
    'source_code', 'api', 'plugin', 'ecommerce', 'newsletter',
  ]),
  short_description: z.string().min(10).max(280),
  description: z.string().min(20),
  asking_price: z.coerce.number().positive(),
  monthly_revenue: z.coerce.number().nonnegative().optional(),
  monthly_profit: z.coerce.number().nonnegative().optional(),
  monthly_traffic: z.coerce.number().nonnegative().optional(),
  total_users: z.coerce.number().nonnegative().optional(),
  growth_rate: z.coerce.number().optional(),
  established_year: z.coerce.number().optional(),
  tech_stack: z.array(z.string()).default([]),
  country: z.string().optional(),
  demo_url: z.string().url().optional().or(z.literal('')),
});

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  const search = searchParams.get('search');
  const page = Number(searchParams.get('page') || '1');
  const perPage = Number(searchParams.get('per_page') || '24');

  let query = supabase
    .from('listings')
    .select('*, seller:users(full_name, avatar_url)', { count: 'exact' })
    .eq('status', 'active');

  if (category) query = query.eq('category', category);
  if (minPrice) query = query.gte('asking_price', Number(minPrice));
  if (maxPrice) query = query.lte('asking_price', Number(maxPrice));
  if (search) query = query.textSearch('search_vector', search);

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    page,
    per_page: perPage,
    total_pages: count ? Math.ceil(count / perPage) : 0,
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createListingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.errors.map((e) => e.message).join(', ') },
      { status: 400 }
    );
  }

  const slug = generateSlug(parsed.data.title) + '-' + Math.random().toString(36).slice(2, 7);

  const { data, error } = await supabase
    .from('listings')
    .insert({
      seller_id: user.id,
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      short_description: parsed.data.short_description,
      description: parsed.data.description,
      asking_price: parsed.data.asking_price,
      monthly_revenue: parsed.data.monthly_revenue || null,
      monthly_profit: parsed.data.monthly_profit || null,
      annual_revenue: parsed.data.monthly_revenue ? parsed.data.monthly_revenue * 12 : null,
      monthly_traffic: parsed.data.monthly_traffic || null,
      total_users: parsed.data.total_users || null,
      growth_rate: parsed.data.growth_rate || null,
      established_year: parsed.data.established_year || null,
      tech_stack: parsed.data.tech_stack,
      country: parsed.data.country || null,
      demo_url: parsed.data.demo_url || null,
      status: 'pending_review',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  // Log activity
  await supabase.from('activity_logs').insert({
    user_id: user.id,
    action: 'listing_created',
    resource_type: 'listing',
    resource_id: data.id,
  });

  return NextResponse.json({ data, error: null, message: 'Listing submitted for review' });
}

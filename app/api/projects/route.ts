import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils';
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(5).max(200),
  category: z.enum([
    'website', 'saas', 'mobile_app', 'ai_product', 'enterprise_software',
    'custom_solution', 'ecommerce', 'api_integration', 'data_analytics',
  ]),
  description: z.string().min(10),
  requirements: z.string().min(20),
  budget_min: z.coerce.number().positive(),
  budget_max: z.coerce.number().positive(),
  timeline_weeks: z.coerce.number().positive(),
  skills_required: z.array(z.string()).default([]),
});

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category');
  const page = Number(searchParams.get('page') || '1');
  const perPage = Number(searchParams.get('per_page') || '20');

  let query = supabase.from('projects').select('*', { count: 'exact' }).eq('status', 'open');

  if (category) query = query.eq('category', category);

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, total: count, page, per_page: perPage });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.errors.map((e) => e.message).join(', ') },
      { status: 400 }
    );
  }

  const slug = generateSlug(parsed.data.title) + '-' + Math.random().toString(36).slice(2, 7);

  const { data, error } = await supabase
    .from('projects')
    .insert({
      client_id: user.id,
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      description: parsed.data.description,
      requirements: parsed.data.requirements,
      budget_min: parsed.data.budget_min,
      budget_max: parsed.data.budget_max,
      timeline_weeks: parsed.data.timeline_weeks,
      skills_required: parsed.data.skills_required,
      status: 'open',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null, message: 'Project posted successfully' });
}

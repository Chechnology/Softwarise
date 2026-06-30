import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { optimizeListing } from '@/lib/openai';
import { z } from 'zod';

const optimizeSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  asking_price: z.number(),
  monthly_revenue: z.number().optional(),
  tech_stack: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = optimizeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Invalid input' }, { status: 400 });
  }

  try {
    const result = await optimizeListing(parsed.data);
    return NextResponse.json({ data: result, error: null });
  } catch (err) {
    console.error('AI optimization error:', err);
    return NextResponse.json({ data: null, error: 'AI optimization failed' }, { status: 500 });
  }
}

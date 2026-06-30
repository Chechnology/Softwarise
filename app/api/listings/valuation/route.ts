import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { suggestValuation } from '@/lib/openai';
import { z } from 'zod';

const valuationSchema = z.object({
  category: z.string(),
  monthly_revenue: z.number(),
  monthly_profit: z.number(),
  growth_rate: z.number(),
  age_months: z.number(),
  tech_stack: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = valuationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Invalid input' }, { status: 400 });
  }

  try {
    const result = await suggestValuation(parsed.data);
    return NextResponse.json({ data: result, error: null });
  } catch (err) {
    console.error('Valuation error:', err);
    return NextResponse.json({ data: null, error: 'Valuation suggestion failed' }, { status: 500 });
  }
}

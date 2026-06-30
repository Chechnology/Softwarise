import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { estimateProjectScope } from '@/lib/openai';
import { z } from 'zod';

const estimateSchema = z.object({
  requirements: z.string().min(20),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = estimateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Requirements too short' }, { status: 400 });
  }

  try {
    const result = await estimateProjectScope(parsed.data.requirements);
    return NextResponse.json({ data: result, error: null });
  } catch (err) {
    console.error('Scope estimation error:', err);
    return NextResponse.json({ data: null, error: 'Estimation failed' }, { status: 500 });
  }
}

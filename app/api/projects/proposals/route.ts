import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const createProposalSchema = z.object({
  project_id: z.string().uuid(),
  proposer_type: z.enum(['agency', 'freelancer']),
  cover_letter: z.string().min(20),
  proposed_amount: z.coerce.number().positive(),
  timeline_weeks: z.coerce.number().positive(),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string(),
    amount: z.number(),
    due_date: z.string(),
  })).optional().default([]),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createProposalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.errors.map((e) => e.message).join(', ') },
      { status: 400 }
    );
  }

  const { data: project } = await supabase
    .from('projects')
    .select('client_id, title')
    .eq('id', parsed.data.project_id)
    .single();

  if (!project) {
    return NextResponse.json({ data: null, error: 'Project not found' }, { status: 404 });
  }

  const { data: proposal, error } = await supabase
    .from('proposals')
    .insert({
      project_id: parsed.data.project_id,
      proposer_id: user.id,
      proposer_type: parsed.data.proposer_type,
      cover_letter: parsed.data.cover_letter,
      proposed_amount: parsed.data.proposed_amount,
      timeline_weeks: parsed.data.timeline_weeks,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  // Create milestones if provided
  if (parsed.data.milestones.length > 0) {
    await supabase.from('milestones').insert(
      parsed.data.milestones.map((m) => ({
        project_id: parsed.data.project_id,
        proposal_id: proposal.id,
        title: m.title,
        description: m.description,
        amount: m.amount,
        due_date: m.due_date,
      }))
    );
  }

  // Increment proposals count
  await supabase.rpc('increment_proposals_count', { p_project_id: parsed.data.project_id }).then(
    () => {},
    async () => {
      // Fallback if RPC doesn't exist
      const { data: current } = await supabase.from('projects').select('proposals_count').eq('id', parsed.data.project_id).single();
      await supabase.from('projects').update({ proposals_count: (current?.proposals_count || 0) + 1 }).eq('id', parsed.data.project_id);
    }
  );

  // Notify client
  await supabase.from('notifications').insert({
    user_id: project.client_id,
    type: 'proposal_received',
    title: 'New proposal received',
    body: `You received a new proposal on "${project.title}"`,
    action_url: `/projects/${parsed.data.project_id}/proposals`,
  });

  return NextResponse.json({ data: proposal, error: null, message: 'Proposal submitted' });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project_id');

  let query = supabase.from('proposals').select('*, proposer:users(full_name, avatar_url)');

  if (projectId) {
    query = query.eq('project_id', projectId);
  } else {
    query = query.eq('proposer_id', user.id);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendNewMessageEmail } from '@/lib/resend';
import { z } from 'zod';

const sendMessageSchema = z.object({
  conversation_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid().optional(),
  content: z.string().min(1),
  type: z.enum(['text', 'file', 'offer']).default('text'),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = sendMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ data: null, error: 'Invalid input' }, { status: 400 });
  }

  let conversationId = parsed.data.conversation_id;

  // Create a new direct conversation if none exists
  if (!conversationId && parsed.data.recipient_id) {
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('type', 'direct')
      .contains('participants', [user.id, parsed.data.recipient_id])
      .maybeSingle();

    if (existing) {
      conversationId = existing.id;
    } else {
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          type: 'direct',
          participants: [user.id, parsed.data.recipient_id],
        })
        .select()
        .single();

      if (convError) {
        return NextResponse.json({ data: null, error: convError.message }, { status: 500 });
      }
      conversationId = newConv.id;
    }
  }

  if (!conversationId) {
    return NextResponse.json({ data: null, error: 'No conversation specified' }, { status: 400 });
  }

  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: parsed.data.content,
      type: parsed.data.type,
    })
    .select('*, sender:users(full_name, avatar_url)')
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  // Update conversation last message
  await supabase
    .from('conversations')
    .update({ last_message: parsed.data.content, last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  // Notify other participants
  const { data: conversation } = await supabase
    .from('conversations')
    .select('participants')
    .eq('id', conversationId)
    .single();

  if (conversation) {
    const otherParticipants = conversation.participants.filter((p: string) => p !== user.id);
    for (const participantId of otherParticipants) {
      await supabase.from('notifications').insert({
        user_id: participantId,
        type: 'new_message',
        title: 'New message',
        body: parsed.data.content.slice(0, 100),
        action_url: `/messages/${conversationId}`,
      });
    }
  }

  return NextResponse.json({ data: message, error: null });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversation_id');

  if (conversationId) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users(full_name, avatar_url)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 });
    }

    // Mark as read
    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id);

    return NextResponse.json({ data, error: null });
  }

  // Return all conversations for user
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .contains('participants', [user.id])
    .order('last_message_at', { ascending: false, nullsFirst: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Upsert user profile on first login
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', data.user.id)
        .single();

      if (!existingProfile) {
        const username = data.user.email?.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase() + '_' + Math.random().toString(36).slice(2, 6);

        await supabase.from('users').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url,
          role: data.user.user_metadata?.role || 'buyer',
        });

        await supabase.from('profiles').insert({
          user_id: data.user.id,
          username,
        });

        await supabase.from('subscriptions').insert({
          user_id: data.user.id,
          plan: 'free',
          status: 'active',
        });
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}

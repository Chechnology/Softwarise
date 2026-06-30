import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopBar } from '@/components/dashboard/DashboardTopBar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: userData } = await supabase
    .from('users')
    .select('full_name, avatar_url, role')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      <DashboardSidebar user={user} userData={userData} profile={profile} />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <DashboardTopBar user={user} userData={userData} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: userData } = await supabase
    .from('users')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (userData?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      <AdminSidebar adminName={userData.full_name} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { AdminStatsGrid } from '@/components/admin/AdminStatsGrid';
import { PendingApprovalsWidget } from '@/components/admin/PendingApprovalsWidget';
import { RevenueOverview } from '@/components/admin/RevenueOverview';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Overview' };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: stats } = await supabase.from('platform_stats').select('*').single();

  const { data: pendingListings } = await supabase
    .from('listings')
    .select('id, title, seller:users(full_name), asking_price, created_at')
    .eq('status', 'pending_review')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Overview</h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Monitor and manage the entire Softwarise ecosystem.</p>
      </div>

      <AdminStatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueOverview />
        </div>
        <PendingApprovalsWidget listings={pendingListings ?? []} />
      </div>
    </div>
  );
}

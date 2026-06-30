import { createClient } from '@/lib/supabase/server';
import { DashboardStatsGrid } from '@/components/dashboard/DashboardStatsGrid';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ActiveListingsWidget } from '@/components/dashboard/ActiveListingsWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('full_name')
    .eq('id', user!.id)
    .single();

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const firstName = userData?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">
            Here's what's happening with your software portfolio today.
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <DashboardStatsGrid />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart />
          <ActiveListingsWidget listings={listings ?? []} />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

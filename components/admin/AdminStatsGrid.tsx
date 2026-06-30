'use client';

import { Users, List, TrendingUp, DollarSign, Briefcase, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface AdminStatsGridProps {
  stats: {
    total_users?: number;
    active_listings?: number;
    completed_acquisitions?: number;
    active_startups?: number;
    registered_investors?: number;
    active_projects?: number;
    total_volume?: number;
    total_listed_mrr?: number;
  } | null;
}

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  const items = [
    { icon: Users, label: 'Total Users', value: formatNumber(stats?.total_users || 2847), color: 'text-primary', bg: 'bg-primary/10' },
    { icon: List, label: 'Active Listings', value: formatNumber(stats?.active_listings || 1240), color: 'text-accent', bg: 'bg-accent/10' },
    { icon: ShieldCheck, label: 'Completed Deals', value: formatNumber(stats?.completed_acquisitions || 340), color: 'text-success', bg: 'bg-success/10' },
    { icon: TrendingUp, label: 'Active Startups', value: formatNumber(stats?.active_startups || 280), color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: Briefcase, label: 'Active Projects', value: formatNumber(stats?.active_projects || 180), color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: DollarSign, label: 'Total GMV', value: formatCurrency(stats?.total_volume || 48000000, 'USD', true), color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.label} className="stat-card">
          <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <p className="stat-value">{item.value}</p>
          <p className="stat-label">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

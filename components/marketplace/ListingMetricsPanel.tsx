'use client';

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency, calculateMultiple } from '@/lib/utils';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';

const REVENUE_HISTORY = [
  { month: 'Jul', revenue: 8400 },
  { month: 'Aug', revenue: 9100 },
  { month: 'Sep', revenue: 9800 },
  { month: 'Oct', revenue: 10600 },
  { month: 'Nov', revenue: 11200 },
  { month: 'Dec', revenue: 12600 },
];

interface ListingMetricsPanelProps {
  listing: {
    monthly_revenue?: number | null;
    monthly_profit?: number | null;
    annual_revenue?: number | null;
    asking_price: number;
    total_users?: number | null;
    active_users?: number | null;
    monthly_traffic?: number | null;
    growth_rate?: number | null;
  };
}

export function ListingMetricsPanel({ listing }: ListingMetricsPanelProps) {
  const multiple = calculateMultiple(listing.asking_price, listing.annual_revenue || (listing.monthly_revenue || 0) * 12);

  return (
    <div className="surface rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Financial Overview</h2>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Monthly Revenue', value: formatCurrency(listing.monthly_revenue || 0) },
          { icon: TrendingUp, label: 'Monthly Profit', value: formatCurrency(listing.monthly_profit || 0) },
          { icon: Users, label: 'Active Users', value: (listing.active_users || 0).toLocaleString() },
          { icon: Activity, label: 'Monthly Traffic', value: (listing.monthly_traffic || 0).toLocaleString() },
        ].map((metric) => (
          <div key={metric.label} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
            <metric.icon className="w-4 h-4 text-primary mb-3" />
            <p className="text-lg font-bold text-white">{metric.value}</p>
            <p className="text-xs text-[#A1A1AA] mt-0.5">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-white">Revenue Trend (6 months)</p>
          <span className="text-xs text-success font-medium">+{listing.growth_rate}% growth</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_HISTORY} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="listingRevGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#18191C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#A1A1AA' }}
                formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#listingRevGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Valuation context */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/15">
        <div>
          <p className="text-xs text-[#A1A1AA]">Revenue Multiple</p>
          <p className="text-lg font-bold text-primary">{multiple}x</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#A1A1AA]">Annual Revenue</p>
          <p className="text-lg font-bold text-white">{formatCurrency(listing.annual_revenue || (listing.monthly_revenue || 0) * 12)}</p>
        </div>
      </div>
    </div>
  );
}

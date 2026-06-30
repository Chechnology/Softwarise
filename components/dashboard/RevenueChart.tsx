'use client';

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const DATA = [
  { month: 'Jan', revenue: 18200 },
  { month: 'Feb', revenue: 22400 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 28100 },
  { month: 'May', revenue: 31200 },
  { month: 'Jun', revenue: 27900 },
  { month: 'Jul', revenue: 35600 },
  { month: 'Aug', revenue: 42300 },
  { month: 'Sep', revenue: 38900 },
  { month: 'Oct', revenue: 47200 },
  { month: 'Nov', revenue: 51800 },
  { month: 'Dec', revenue: 58400 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-3 py-2 border border-white/10">
        <p className="text-xs text-[#A1A1AA] mb-1">{label}</p>
        <p className="text-sm font-semibold text-white">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

export function RevenueChart() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">Last 12 months</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{formatCurrency(421800, 'USD', true)}</p>
          <p className="text-xs text-success">+24.3% YoY</p>
        </div>
      </div>

      <div className="h-64 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A1A1AA', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A1A1AA', fontSize: 11 }}
              tickFormatter={(v) => `$${v / 1000}K`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

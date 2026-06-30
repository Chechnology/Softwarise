'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const DATA = [
  { month: 'Jan', listings: 84000, investments: 120000, projects: 45000, monetization: 12000 },
  { month: 'Feb', listings: 92000, investments: 145000, projects: 52000, monetization: 14500 },
  { month: 'Mar', listings: 78000, investments: 98000, projects: 48000, monetization: 13200 },
  { month: 'Apr', listings: 115000, investments: 210000, projects: 61000, monetization: 18900 },
  { month: 'May', listings: 134000, investments: 245000, projects: 67000, monetization: 21400 },
  { month: 'Jun', listings: 121000, investments: 198000, projects: 58000, monetization: 19800 },
];

export function RevenueOverview() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Platform Revenue by Vertical</h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">Last 6 months · Platform fees collected</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 11 }} tickFormatter={(v) => `$${v/1000}K`} width={45} />
            <Tooltip
              contentStyle={{ background: '#18191C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar dataKey="listings" stackId="a" fill="#D4AF37" radius={[0,0,0,0]} />
            <Bar dataKey="investments" stackId="a" fill="#3B82F6" radius={[0,0,0,0]} />
            <Bar dataKey="projects" stackId="a" fill="#8B5CF6" radius={[0,0,0,0]} />
            <Bar dataKey="monetization" stackId="a" fill="#10B981" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4 justify-center">
        {[
          { label: 'Listings', color: '#D4AF37' },
          { label: 'Investments', color: '#3B82F6' },
          { label: 'Projects', color: '#8B5CF6' },
          { label: 'Monetization', color: '#10B981' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
            <span className="text-xs text-[#A1A1AA]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { DollarSign, MessageSquare, Eye, Heart, TrendingUp } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

const ACTIVITIES = [
  { icon: DollarSign, text: 'New offer received on "E-Commerce Analytics SaaS"', time: new Date(Date.now() - 1000 * 60 * 30), color: 'text-success' },
  { icon: MessageSquare, text: 'New message from Adaora Chukwu', time: new Date(Date.now() - 1000 * 60 * 90), color: 'text-accent' },
  { icon: Eye, text: 'Your listing reached 1,000 views', time: new Date(Date.now() - 1000 * 60 * 60 * 4), color: 'text-primary' },
  { icon: Heart, text: '3 new users saved your listing', time: new Date(Date.now() - 1000 * 60 * 60 * 8), color: 'text-red-400' },
  { icon: TrendingUp, text: 'Investor viewed your startup profile', time: new Date(Date.now() - 1000 * 60 * 60 * 20), color: 'text-violet-400' },
];

export function RecentActivity() {
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {ACTIVITIES.map((activity, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
              <activity.icon className={`w-3.5 h-3.5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white leading-snug">{activity.text}</p>
              <p className="text-xs text-[#A1A1AA] mt-0.5">{timeAgo(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

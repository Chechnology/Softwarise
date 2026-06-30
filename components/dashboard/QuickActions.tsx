'use client';

import Link from 'next/link';
import { Plus, TrendingUp, Wrench, Zap, ArrowRight } from 'lucide-react';

const ACTIONS = [
  { icon: Plus, label: 'Create Listing', href: '/listings/new', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: TrendingUp, label: 'Raise Capital', href: '/invest/raise', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: Wrench, label: 'Post a Project', href: '/build/new', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Zap, label: 'Boost Listing', href: '/monetize/featured', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export function QuickActions() {
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
          >
            <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0`}>
              <action.icon className={`w-4 h-4 ${action.color}`} />
            </div>
            <span className="text-sm font-medium text-white flex-1">{action.label}</span>
            <ArrowRight className="w-4 h-4 text-[#A1A1AA] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}

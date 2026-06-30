'use client';

import { motion } from 'framer-motion';
import { DollarSign, Eye, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const STATS = [
  {
    label: 'Total Revenue',
    value: 284730,
    isCurrency: true,
    change: 12.4,
    icon: DollarSign,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Listing Views',
    value: 12480,
    isCurrency: false,
    change: 8.2,
    icon: Eye,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    label: 'Active Conversations',
    value: 23,
    isCurrency: false,
    change: -3.1,
    icon: MessageSquare,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Portfolio Growth',
    value: 18.6,
    isCurrency: false,
    isPercent: true,
    change: 4.2,
    icon: TrendingUp,
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

export function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stat.change > 0 ? 'text-success' : 'text-error'}`}>
              {stat.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(stat.change)}%
            </div>
          </div>
          <p className="stat-value">
            {stat.isCurrency
              ? formatCurrency(stat.value, 'USD', true)
              : stat.isPercent
              ? `${stat.value}%`
              : stat.value.toLocaleString()}
          </p>
          <p className="stat-label">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

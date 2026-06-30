'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { formatCurrency, STAGE_LABELS } from '@/lib/utils';
import type { StartupProfile } from '@/types';

const DEMO_STARTUPS: Partial<StartupProfile>[] = [
  { id: '1', company_name: 'PayFlow Africa', tagline: 'Cross-border payment infrastructure for SMEs', industry: 'FinTech', stage: 'seed', country: 'Nigeria', team_size: 12, funding_goal: 2500000, equity_offered: 12, pre_money_valuation: 18000000, total_raised: 890000, monthly_revenue: 88000, mrr_growth: 34, total_users: 4200 },
  { id: '2', company_name: 'MedVault', tagline: 'Digital health records for African hospitals', industry: 'HealthTech', stage: 'pre_seed', country: 'Kenya', team_size: 8, funding_goal: 800000, equity_offered: 15, pre_money_valuation: 4500000, total_raised: 150000, monthly_revenue: 18000, mrr_growth: 51, total_users: 960 },
  { id: '3', company_name: 'FreightOS Lagos', tagline: 'Last-mile logistics optimization platform', industry: 'LogisticsTech', stage: 'series_a', country: 'Nigeria', team_size: 28, funding_goal: 6000000, equity_offered: 10, pre_money_valuation: 54000000, total_raised: 3200000, monthly_revenue: 310000, mrr_growth: 22, total_users: 18400 },
  { id: '4', company_name: 'Curricula AI', tagline: 'Personalized learning paths powered by AI', industry: 'EdTech', stage: 'seed', country: 'Ghana', team_size: 6, funding_goal: 1200000, equity_offered: 14, pre_money_valuation: 7200000, total_raised: 320000, monthly_revenue: 42000, mrr_growth: 67, total_users: 7800 },
  { id: '5', company_name: 'AgriChain', tagline: 'Supply chain transparency for smallholder farmers', industry: 'AgriTech', stage: 'pre_seed', country: 'Kenya', team_size: 5, funding_goal: 600000, equity_offered: 16, pre_money_valuation: 3200000, total_raised: 80000, monthly_revenue: 8500, mrr_growth: 44, total_users: 2100 },
  { id: '6', company_name: 'RentEasy', tagline: 'Property management SaaS for African landlords', industry: 'PropTech', stage: 'seed', country: 'South Africa', team_size: 9, funding_goal: 1500000, equity_offered: 13, pre_money_valuation: 9800000, total_raised: 410000, monthly_revenue: 31000, mrr_growth: 29, total_users: 5600 },
];

const STAGE_COLORS: Record<string, string> = {
  pre_seed: 'badge-blue', seed: 'badge-green', series_a: 'badge-gold',
  series_b: 'badge-gold', series_c: 'badge-gold', growth: 'badge-gold', pre_ipo: 'badge-gold',
};

export function StartupGrid({ startups }: { startups: Partial<StartupProfile>[] }) {
  const display = startups.length > 0 ? startups : DEMO_STARTUPS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {display.map((startup, i) => {
        const progress = ((startup.total_raised || 0) / (startup.funding_goal || 1)) * 100;
        return (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/invest/${startup.id}`}>
              <div className="card p-6 h-full group cursor-pointer">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg">{startup.company_name?.[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{startup.company_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-[#A1A1AA]" />
                        <span className="text-xs text-[#A1A1AA]">{startup.country}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${STAGE_COLORS[startup.stage || 'seed']}`}>{STAGE_LABELS[startup.stage || 'seed']}</span>
                </div>

                <p className="text-sm text-[#A1A1AA] mb-5 leading-relaxed line-clamp-2">{startup.tagline}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-[#A1A1AA] mb-1">MRR</p>
                    <p className="text-sm font-semibold text-white">{formatCurrency(startup.monthly_revenue || 0, 'USD', true)}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-[#A1A1AA] mb-1">Growth</p>
                    <p className="text-sm font-semibold text-success">+{startup.mrr_growth}%</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-[#A1A1AA] mb-1">Team</p>
                    <p className="text-sm font-semibold text-white flex items-center gap-1"><Users className="w-3.5 h-3.5" />{startup.team_size}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#A1A1AA]">{formatCurrency(startup.total_raised || 0, 'USD', true)} raised</span>
                    <span className="text-xs font-medium text-primary">{Math.round(progress)}% of {formatCurrency(startup.funding_goal || 0, 'USD', true)}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70" style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-[#A1A1AA]">Valuation</p>
                      <p className="text-sm font-semibold text-white">{formatCurrency(startup.pre_money_valuation || 0, 'USD', true)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">Equity</p>
                      <p className="text-sm font-semibold text-white">{startup.equity_offered}%</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#A1A1AA]">{startup.industry}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

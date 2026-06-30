'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, TrendingUp, Target } from 'lucide-react';
import { formatCurrency, STAGE_LABELS } from '@/lib/utils';
import type { StartupProfile } from '@/types';

const DEMO_STARTUPS: Partial<StartupProfile>[] = [
  {
    id: '1', company_name: 'PayFlow Africa', tagline: 'Cross-border payment infrastructure for SMEs',
    industry: 'FinTech', stage: 'seed', country: 'Nigeria', team_size: 12,
    funding_goal: 2500000, equity_offered: 12, pre_money_valuation: 18000000,
    total_raised: 890000, monthly_revenue: 88000, mrr_growth: 34,
    logo_url: null, total_users: 4200,
  },
  {
    id: '2', company_name: 'MedVault', tagline: 'Digital health records for African hospitals',
    industry: 'HealthTech', stage: 'pre_seed', country: 'Kenya', team_size: 8,
    funding_goal: 800000, equity_offered: 15, pre_money_valuation: 4500000,
    total_raised: 150000, monthly_revenue: 18000, mrr_growth: 51,
    logo_url: null, total_users: 960,
  },
  {
    id: '3', company_name: 'FreightOS Lagos', tagline: 'Last-mile logistics optimization platform',
    industry: 'LogisticsTech', stage: 'series_a', country: 'Nigeria', team_size: 28,
    funding_goal: 6000000, equity_offered: 10, pre_money_valuation: 54000000,
    total_raised: 3200000, monthly_revenue: 310000, mrr_growth: 22,
    logo_url: null, total_users: 18400,
  },
  {
    id: '4', company_name: 'Curricula AI', tagline: 'Personalized learning paths powered by AI',
    industry: 'EdTech', stage: 'seed', country: 'Ghana', team_size: 6,
    funding_goal: 1200000, equity_offered: 14, pre_money_valuation: 7200000,
    total_raised: 320000, monthly_revenue: 42000, mrr_growth: 67,
    logo_url: null, total_users: 7800,
  },
];

const STAGE_COLORS: Record<string, string> = {
  pre_seed: 'badge-blue',
  seed: 'badge-green',
  series_a: 'badge-gold',
  series_b: 'badge-gold',
  series_c: 'badge-gold',
  growth: 'badge-gold',
  pre_ipo: 'badge-gold',
};

interface InvestmentOpportunitiesProps {
  startups: Partial<StartupProfile>[];
}

export function InvestmentOpportunities({ startups }: InvestmentOpportunitiesProps) {
  const display = startups.length > 0 ? startups : DEMO_STARTUPS;

  return (
    <section className="py-24">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="tracking-luxury text-primary mb-3"
            >
              Capital
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
            >
              Active Investment Opportunities
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="/invest"
              className="hidden sm:flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-primary transition-colors font-medium"
            >
              Browse all startups <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {display.slice(0, 4).map((startup, i) => {
            const progress = ((startup.total_raised || 0) / (startup.funding_goal || 1)) * 100;

            return (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/invest/${startup.id}`}>
                  <div className="card p-6 h-full group cursor-pointer">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        {/* Logo placeholder */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-lg">
                            {startup.company_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                            {startup.company_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-[#A1A1AA]" />
                            <span className="text-xs text-[#A1A1AA]">{startup.country}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`badge ${STAGE_COLORS[startup.stage || 'seed']}`}>
                        {STAGE_LABELS[startup.stage || 'seed']}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm text-[#A1A1AA] mb-5 leading-relaxed line-clamp-2">
                      {startup.tagline}
                    </p>

                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-xs text-[#A1A1AA] mb-1">MRR</p>
                        <p className="text-sm font-semibold text-white">
                          {formatCurrency(startup.monthly_revenue || 0, 'USD', true)}
                        </p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-xs text-[#A1A1AA] mb-1">Growth</p>
                        <p className="text-sm font-semibold text-success">
                          +{startup.mrr_growth}% MoM
                        </p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-xs text-[#A1A1AA] mb-1">Team</p>
                        <p className="text-sm font-semibold text-white flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {startup.team_size}
                        </p>
                      </div>
                    </div>

                    {/* Funding progress */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#A1A1AA]">
                          {formatCurrency(startup.total_raised || 0, 'USD', true)} raised
                        </span>
                        <span className="text-xs font-medium text-primary">
                          {Math.round(progress)}% of {formatCurrency(startup.funding_goal || 0, 'USD', true)} goal
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(progress, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-[#A1A1AA]">Valuation</p>
                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(startup.pre_money_valuation || 0, 'USD', true)}
                          </p>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/invest" className="btn btn-secondary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Browse All Startups
          </Link>
          <Link href="/invest/raise" className="btn btn-secondary flex items-center gap-2">
            <Target className="w-4 h-4" />
            Raise Capital
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

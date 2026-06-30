'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, TrendingUp, Wrench, Zap, ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    icon: ShoppingBag,
    label: 'Software Sale',
    tagline: 'Buy & sell software assets',
    description: 'Acquire profitable SaaS products, mobile apps, websites, domains, and digital businesses from a curated marketplace of verified listings.',
    href: '/marketplace',
    color: 'from-primary/20 to-primary/5',
    border: 'border-primary/20 hover:border-primary/40',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    stats: ['1,200+ Active Listings', '$48M+ Total GMV', '340+ Completed Sales'],
  },
  {
    icon: TrendingUp,
    label: 'Investment Seeking',
    tagline: 'Raise or deploy capital',
    description: 'Founders raise from a network of African and global investors. Investors discover high-potential software startups with verified traction.',
    href: '/invest',
    color: 'from-accent/20 to-accent/5',
    border: 'border-accent/20 hover:border-accent/40',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
    stats: ['280+ Startups Funded', '$120M+ Capital Deployed', '94 Active Investors'],
  },
  {
    icon: Wrench,
    label: 'Software Manufacturing',
    tagline: 'Commission world-class builds',
    description: 'Post projects and receive proposals from elite development agencies and freelancers. Milestone-based escrow payments ensure delivery.',
    href: '/build',
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    stats: ['180+ Vetted Agencies', '820 Projects Completed', '4.9/5 Avg. Rating'],
  },
  {
    icon: Zap,
    label: 'Software Monetization',
    tagline: 'Generate revenue from software',
    description: 'Feature listings, run sponsored placements, sell lifetime deals, and access advertising inventory to grow your software revenue.',
    href: '/monetize',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    stats: ['$2.4M Revenue Unlocked', '640 Featured Listings', '18 Ad Placements'],
  },
];

export function PlatformPillars() {
  return (
    <section className="py-28 relative">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="tracking-luxury text-primary mb-4"
          >
            The Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5"
          >
            Four pillars of the{' '}
            <span className="text-gradient-gold">software economy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg text-[#A1A1AA] max-w-2xl mx-auto"
          >
            One unified platform covering every stage of a software asset's lifecycle — from creation to exit.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={pillar.href}
                className={`group flex flex-col h-full bg-gradient-to-br ${pillar.color} border ${pillar.border} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Icon & label */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center`}>
                    <pillar.icon className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <div className="mb-4">
                  <p className="text-xs tracking-luxury text-[#A1A1AA] mb-2">{pillar.label}</p>
                  <h3 className="text-xl font-semibold text-white mb-3">{pillar.tagline}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{pillar.description}</p>
                </div>

                {/* Stats */}
                <div className="mt-auto pt-6 border-t border-white/[0.08] flex flex-wrap gap-4">
                  {pillar.stats.map((stat) => (
                    <span key={stat} className="text-xs text-[#A1A1AA] font-medium">
                      {stat}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

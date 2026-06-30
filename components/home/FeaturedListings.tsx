'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Eye, Heart, TrendingUp, Globe } from 'lucide-react';
import { formatCurrency, CATEGORY_LABELS } from '@/lib/utils';
import type { Listing } from '@/types';

const DEMO_LISTINGS: Partial<Listing>[] = [
  {
    id: '1', title: 'E-Commerce Analytics SaaS', category: 'saas',
    asking_price: 340000, monthly_revenue: 12600, monthly_profit: 7400,
    growth_rate: 28, views_count: 1240, saves_count: 47,
    tech_stack: ['React', 'Node.js', 'PostgreSQL'], country: 'Nigeria',
    short_description: 'Profitable analytics platform serving 840 e-commerce stores with 94% retention.',
  },
  {
    id: '2', title: 'Mobile Payment Gateway App', category: 'mobile_app',
    asking_price: 185000, monthly_revenue: 6800, monthly_profit: 4100,
    growth_rate: 41, views_count: 890, saves_count: 31,
    tech_stack: ['Flutter', 'Python', 'Stripe'], country: 'Ghana',
    short_description: 'Cross-border payment solution with 45K active users across 8 African markets.',
  },
  {
    id: '3', title: 'HR Management Platform', category: 'saas',
    asking_price: 475000, monthly_revenue: 18200, monthly_profit: 11000,
    growth_rate: 19, views_count: 2100, saves_count: 88,
    tech_stack: ['Next.js', 'Supabase', 'OpenAI'], country: 'Kenya',
    short_description: 'AI-powered HR suite used by 320+ companies. Includes payroll, compliance & recruitment.',
  },
  {
    id: '4', title: 'EdTech Learning Management System', category: 'saas',
    asking_price: 220000, monthly_revenue: 8900, monthly_profit: 5200,
    growth_rate: 35, views_count: 650, saves_count: 22,
    tech_stack: ['Vue.js', 'Laravel', 'MySQL'], country: 'South Africa',
    short_description: 'LMS platform with 12K active students and 240 certified instructors.',
  },
  {
    id: '5', title: 'Newsletter Monetization Tool', category: 'newsletter',
    asking_price: 95000, monthly_revenue: 3800, monthly_profit: 2900,
    growth_rate: 52, views_count: 430, saves_count: 18,
    tech_stack: ['Next.js', 'Resend', 'Stripe'], country: 'Nigeria',
    short_description: 'Monetization layer for newsletters. 680 publishers, $1.2M in payments processed.',
  },
  {
    id: '6', title: 'Logistics Tracking SaaS', category: 'saas',
    asking_price: 560000, monthly_revenue: 21400, monthly_profit: 13800,
    growth_rate: 24, views_count: 1800, saves_count: 64,
    tech_stack: ['React', 'Go', 'PostgreSQL', 'Redis'], country: 'Nigeria',
    short_description: 'Real-time fleet & logistics management serving 180 logistics companies.',
  },
];

interface FeaturedListingsProps {
  listings: Partial<Listing>[];
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  const display = listings.length > 0 ? listings : DEMO_LISTINGS;

  return (
    <section className="py-24 bg-[#0D0D0F] border-y border-white/[0.06]">
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
              Marketplace
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
            >
              Featured Listings
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/marketplace"
              className="hidden sm:flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-primary transition-colors font-medium"
            >
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.slice(0, 6).map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/marketplace/${listing.id}`}>
                <div className="card h-full flex flex-col p-6 cursor-pointer group">
                  {/* Top */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="badge badge-gold text-[11px]">
                      {CATEGORY_LABELS[listing.category || 'saas']}
                    </span>
                    <div className="flex items-center gap-3">
                      {listing.country && (
                        <span className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                          <Globe className="w-3 h-3" />
                          {listing.country}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & description */}
                  <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 mb-5 flex-1">
                    {listing.short_description}
                  </p>

                  {/* Tech stack */}
                  {listing.tech_stack && listing.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {listing.tech_stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/6 text-[#A1A1AA] border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                      {listing.tech_stack.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/6 text-[#A1A1AA] border border-white/[0.08]">
                          +{listing.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-white/[0.06]">
                    <div>
                      <p className="text-xs text-[#A1A1AA] mb-1">Asking Price</p>
                      <p className="text-sm font-semibold text-white">
                        {formatCurrency(listing.asking_price || 0, 'USD', true)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA] mb-1">MRR</p>
                      <p className="text-sm font-semibold text-white">
                        {formatCurrency(listing.monthly_revenue || 0, 'USD', true)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA] mb-1">Growth</p>
                      <p className={`text-sm font-semibold ${(listing.growth_rate || 0) > 0 ? 'text-success' : 'text-error'}`}>
                        {(listing.growth_rate || 0) > 0 ? '+' : ''}{listing.growth_rate}%
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {listing.views_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> {listing.saves_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/marketplace" className="btn btn-secondary">
            View All Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

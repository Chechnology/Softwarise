'use client';

import Link from 'next/link';
import { Eye, Heart, ArrowRight, Globe, BadgeCheck } from 'lucide-react';
import { formatCurrency, CATEGORY_LABELS } from '@/lib/utils';
import type { Listing } from '@/types';

interface MarketplaceGridProps {
  listings: Partial<Listing>[];
  view?: 'grid' | 'table';
}

const DEMO_LISTINGS: Partial<Listing>[] = Array.from({ length: 9 }).map((_, i) => ({
  id: String(i + 1),
  title: ['E-Commerce Analytics SaaS', 'Mobile Payment Gateway', 'HR Management Platform', 'EdTech LMS', 'Newsletter Tool', 'Logistics SaaS', 'Recipe App', 'Fitness Tracker', 'Invoice Generator'][i],
  category: (['saas', 'mobile_app', 'saas', 'saas', 'newsletter', 'saas', 'mobile_app', 'mobile_app', 'website'] as const)[i],
  asking_price: [340000, 185000, 475000, 220000, 95000, 560000, 38000, 67000, 28000][i],
  monthly_revenue: [12600, 6800, 18200, 8900, 3800, 21400, 1200, 2800, 980][i],
  growth_rate: [28, 41, 19, 35, 52, 24, 12, 18, 8][i],
  views_count: [1240, 890, 2100, 650, 430, 1800, 220, 510, 180][i],
  saves_count: [47, 31, 88, 22, 18, 64, 8, 19, 6][i],
  country: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Nigeria', 'Nigeria', 'Egypt', 'Kenya', 'Ghana'][i],
  verified_financials: i % 3 === 0,
  short_description: 'Profitable, well-maintained software business with consistent growth and a loyal customer base.',
  tech_stack: ['React', 'Node.js', 'PostgreSQL'],
}));

export function MarketplaceGrid({ listings, view = 'grid' }: MarketplaceGridProps) {
  const display = listings.length > 0 ? listings : DEMO_LISTINGS;

  if (view === 'table') {
    return <MarketplaceTable listings={display} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {display.map((listing) => (
        <Link key={listing.id} href={`/marketplace/${listing.id}`}>
          <div className="card h-full flex flex-col p-6 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <span className="badge badge-gold text-[11px]">{CATEGORY_LABELS[listing.category || 'saas']}</span>
              <div className="flex items-center gap-2">
                {listing.verified_financials && (
                  <BadgeCheck className="w-4 h-4 text-accent" />
                )}
                {listing.country && (
                  <span className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                    <Globe className="w-3 h-3" />{listing.country}
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {listing.title}
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 mb-5 flex-1">
              {listing.short_description}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-white/[0.06]">
              <div>
                <p className="text-xs text-[#A1A1AA] mb-1">Price</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(listing.asking_price || 0, 'USD', true)}</p>
              </div>
              <div>
                <p className="text-xs text-[#A1A1AA] mb-1">MRR</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(listing.monthly_revenue || 0, 'USD', true)}</p>
              </div>
              <div>
                <p className="text-xs text-[#A1A1AA] mb-1">Growth</p>
                <p className={`text-sm font-semibold ${(listing.growth_rate || 0) > 0 ? 'text-success' : 'text-error'}`}>
                  +{listing.growth_rate}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views_count}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{listing.saves_count}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                View <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function MarketplaceTable({ listings }: { listings: Partial<Listing>[] }) {
  return (
    <div className="surface rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {['Listing', 'Category', 'Price', 'MRR', 'Growth', 'Country', ''].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs tracking-luxury text-[#A1A1AA]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/marketplace/${listing.id}`} className="text-sm font-medium text-white hover:text-primary transition-colors">
                    {listing.title}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className="badge badge-gold text-[10px]">{CATEGORY_LABELS[listing.category || 'saas']}</span>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-white">{formatCurrency(listing.asking_price || 0, 'USD', true)}</td>
                <td className="px-5 py-4 text-sm text-[#A1A1AA]">{formatCurrency(listing.monthly_revenue || 0, 'USD', true)}</td>
                <td className="px-5 py-4">
                  <span className={`text-sm font-medium ${(listing.growth_rate || 0) > 0 ? 'text-success' : 'text-error'}`}>
                    +{listing.growth_rate}%
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#A1A1AA]">{listing.country}</td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/marketplace/${listing.id}`} className="text-xs text-primary font-medium hover:text-primary/80 transition-colors">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

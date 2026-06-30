'use client';

import Link from 'next/link';
import { ArrowRight, Eye, Heart, Plus } from 'lucide-react';
import { formatCurrency, CATEGORY_LABELS, STATUS_COLORS } from '@/lib/utils';
import type { Listing } from '@/types';

interface ActiveListingsWidgetProps {
  listings: Partial<Listing>[];
}

const DEMO: Partial<Listing>[] = [
  { id: '1', title: 'E-Commerce Analytics SaaS', category: 'saas', status: 'active', asking_price: 340000, views_count: 1240, saves_count: 47, offers_count: 6 },
  { id: '2', title: 'Mobile Loyalty App', category: 'mobile_app', status: 'under_offer', asking_price: 120000, views_count: 540, saves_count: 22, offers_count: 2 },
  { id: '3', title: 'Recipe Sharing Platform', category: 'website', status: 'pending_review', asking_price: 45000, views_count: 0, saves_count: 0, offers_count: 0 },
];

export function ActiveListingsWidget({ listings }: ActiveListingsWidgetProps) {
  const display = listings.length > 0 ? listings : DEMO;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-white">Your Listings</h3>
        <Link href="/listings/new" className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Listing
        </Link>
      </div>

      <div className="space-y-3">
        {display.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-bold">{CATEGORY_LABELS[listing.category || 'saas']?.[0]}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{listing.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs capitalize ${STATUS_COLORS[listing.status || 'draft']}`}>
                    {listing.status?.replace('_', ' ')}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                    <Eye className="w-3 h-3" /> {listing.views_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                    <Heart className="w-3 h-3" /> {listing.saves_count}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <p className="text-sm font-semibold text-white">{formatCurrency(listing.asking_price || 0, 'USD', true)}</p>
              <ArrowRight className="w-4 h-4 text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

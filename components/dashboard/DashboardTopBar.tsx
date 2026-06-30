'use client';

import { useState } from 'react';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

interface DashboardTopBarProps {
  user: User;
  userData: { full_name: string | null; avatar_url: string | null; role: string } | null;
}

export function DashboardTopBar({ user, userData }: DashboardTopBarProps) {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/[0.06] px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type="text"
            placeholder="Search listings, startups, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/listings/new"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-[#0B0B0D] text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-glow-sm"
          >
            <Plus className="w-4 h-4" /> New Listing
          </Link>
        </div>
      </div>
    </header>
  );
}

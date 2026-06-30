'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function InvestHeader({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set('search', search);
    else params.delete('search');
    router.push(`/invest?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="tracking-luxury text-primary mb-2">Capital</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Active Funding Rounds
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            {totalCount.toLocaleString()} startups actively raising · Direct access to founders
          </p>
        </div>
        <Link
          href="/invest/raise"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow-sm whitespace-nowrap"
        >
          <TrendingUp className="w-4 h-4" /> Raise Capital
        </Link>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
        <input
          type="text"
          placeholder="Search by company, industry, or technology..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full input pl-11"
        />
      </form>
    </div>
  );
}

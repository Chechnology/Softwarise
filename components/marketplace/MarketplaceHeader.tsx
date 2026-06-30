'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Grid3x3, TableProperties } from 'lucide-react';
import { useState } from 'react';

interface MarketplaceHeaderProps {
  totalCount: number;
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'revenue_desc', label: 'Highest Revenue' },
];

export function MarketplaceHeader({ totalCount }: MarketplaceHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/marketplace?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('search', search);
  };

  const currentView = searchParams.get('view') || 'grid';

  return (
    <div>
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="tracking-luxury text-primary mb-2">Marketplace</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Software Assets For Sale
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            {totalCount.toLocaleString()} active listings · Verified financials available
          </p>
        </div>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type="text"
            placeholder="Search by name, technology, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full input pl-11"
          />
        </form>

        <select
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="input w-full sm:w-56 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#18191C]">
              {opt.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 bg-[#18191C] border border-white/[0.08] rounded-lg p-1">
          <button
            onClick={() => updateParam('view', 'grid')}
            className={`p-2 rounded-md transition-colors ${currentView === 'grid' ? 'bg-primary/15 text-primary' : 'text-[#A1A1AA] hover:text-white'}`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateParam('view', 'table')}
            className={`p-2 rounded-md transition-colors ${currentView === 'table' ? 'bg-primary/15 text-primary' : 'text-[#A1A1AA] hover:text-white'}`}
          >
            <TableProperties className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

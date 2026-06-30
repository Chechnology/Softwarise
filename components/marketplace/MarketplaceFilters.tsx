'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import { CATEGORY_LABELS, COUNTRIES, TECH_STACKS } from '@/lib/utils';

const CATEGORIES = Object.entries(CATEGORY_LABELS);
const PRICE_RANGES = [
  { label: 'Under $50K', min: 0, max: 50000 },
  { label: '$50K – $150K', min: 50000, max: 150000 },
  { label: '$150K – $500K', min: 150000, max: 500000 },
  { label: '$500K – $1M', min: 500000, max: 1000000 },
  { label: '$1M+', min: 1000000, max: undefined },
];

export function MarketplaceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    country: false,
    tech: false,
  });

  const activeCategory = searchParams.get('category');
  const activeMin = searchParams.get('min_price');
  const activeMax = searchParams.get('max_price');

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    router.push(`/marketplace?${params.toString()}`);
  };

  const clearAll = () => router.push('/marketplace');

  const hasActiveFilters = activeCategory || activeMin || activeMax;

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="surface rounded-2xl p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection
        title="Category"
        expanded={expandedSections.category}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-2">
          {CATEGORIES.map(([value, label]) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={activeCategory === value}
                onChange={() => updateParams({ category: value })}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className={`text-sm transition-colors ${activeCategory === value ? 'text-primary font-medium' : 'text-[#A1A1AA] group-hover:text-white'}`}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="divider my-5" />

      {/* Price */}
      <FilterSection
        title="Price Range"
        expanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isActive = activeMin === String(range.min) && activeMax === String(range.max ?? '');
            return (
              <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={isActive}
                  onChange={() =>
                    updateParams({
                      min_price: String(range.min),
                      max_price: range.max ? String(range.max) : null,
                    })
                  }
                  className="w-3.5 h-3.5 accent-primary"
                />
                <span className={`text-sm transition-colors ${isActive ? 'text-primary font-medium' : 'text-[#A1A1AA] group-hover:text-white'}`}>
                  {range.label}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <div className="divider my-5" />

      {/* Country */}
      <FilterSection
        title="Country"
        expanded={expandedSections.country}
        onToggle={() => toggleSection('country')}
      >
        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
          {COUNTRIES.slice(0, 10).map((country) => (
            <label key={country} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-3.5 h-3.5 accent-primary rounded" />
              <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">{country}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="divider my-5" />

      {/* Tech Stack */}
      <FilterSection
        title="Tech Stack"
        expanded={expandedSections.tech}
        onToggle={() => toggleSection('tech')}
      >
        <div className="flex flex-wrap gap-2">
          {TECH_STACKS.slice(0, 12).map((tech) => (
            <button
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA] hover:border-primary/30 hover:text-primary transition-colors"
            >
              {tech}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Verified financials toggle */}
      <div className="mt-5 pt-5 border-t border-white/[0.08]">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-white font-medium">Verified Financials Only</span>
          <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
        </label>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button onClick={onToggle} className="flex items-center justify-between w-full mb-3">
        <span className="text-sm font-medium text-white">{title}</span>
        <ChevronDown className={`w-4 h-4 text-[#A1A1AA] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && children}
    </div>
  );
}

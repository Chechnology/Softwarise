'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { STAGE_LABELS } from '@/lib/utils';
import { X } from 'lucide-react';

const STAGES = Object.entries(STAGE_LABELS);
const INDUSTRIES = [
  'FinTech', 'HealthTech', 'EdTech', 'LogisticsTech', 'AgriTech',
  'PropTech', 'E-Commerce', 'AI/ML', 'CleanTech', 'InsurTech',
];

export function InvestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeStage = searchParams.get('stage');
  const activeIndustry = searchParams.get('industry');

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/invest?${params.toString()}`);
  };

  return (
    <div className="surface rounded-2xl p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Filters</h3>
        {(activeStage || activeIndustry) && (
          <button onClick={() => router.push('/invest')} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-white mb-3">Funding Stage</p>
        <div className="space-y-2">
          {STAGES.map(([value, label]) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="stage"
                checked={activeStage === value}
                onChange={() => updateParam('stage', value)}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className={`text-sm transition-colors ${activeStage === value ? 'text-primary font-medium' : 'text-[#A1A1AA] group-hover:text-white'}`}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="divider mb-6" />

      <div>
        <p className="text-sm font-medium text-white mb-3">Industry</p>
        <div className="space-y-2">
          {INDUSTRIES.map((industry) => (
            <label key={industry} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="industry"
                checked={activeIndustry === industry}
                onChange={() => updateParam('industry', industry)}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className={`text-sm transition-colors ${activeIndustry === industry ? 'text-primary font-medium' : 'text-[#A1A1AA] group-hover:text-white'}`}>
                {industry}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

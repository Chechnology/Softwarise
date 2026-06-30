'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = [
  { label: 'SaaS CRM Tool', price: '$340,000', change: '+12.4%', up: true },
  { label: 'Mobile App — 45K DAU', price: '$185,000', change: '+8.2%', up: true },
  { label: 'E-Commerce Platform', price: '$920,000', change: '-2.1%', up: false },
  { label: 'FinTech Seed Round', price: '$2.5M Raise', change: '18% Equity', up: true },
  { label: 'HR SaaS', price: '$475,000', change: '+31.7%', up: true },
  { label: 'AI Writing Tool', price: '$220,000', change: '+19.3%', up: true },
  { label: 'Domain Portfolio', price: '$55,000', change: '+4.8%', up: true },
  { label: 'EdTech Platform', price: '$1.1M', change: 'Series A', up: true },
  { label: 'Newsletter — 80K Subs', price: '$140,000', change: '+22.1%', up: true },
  { label: 'Analytics SaaS', price: '$310,000', change: '+9.6%', up: true },
];

// Duplicate for seamless loop
const ALL_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS];

export function TickerBar() {
  return (
    <div className="relative bg-[#111214] border-y border-white/[0.08] overflow-hidden py-3.5">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#111214] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#111214] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-8 animate-ticker whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {ALL_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium text-white">{item.label}</span>
            <span className="text-sm font-semibold text-primary">{item.price}</span>
            <div className={`flex items-center gap-1 text-xs font-medium ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change}
            </div>
            <span className="text-white/20">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ImageIcon, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER_COUNT = 4;

export function ListingGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Main image */}
      <div className="relative aspect-video bg-gradient-to-br from-[#18191C] to-[#0B0B0D] flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
          <p className="text-sm text-[#A1A1AA]">Product screenshot {activeIndex + 1}</p>
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => setActiveIndex((i) => (i > 0 ? i - 1 : PLACEHOLDER_COUNT - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={() => setActiveIndex((i) => (i < PLACEHOLDER_COUNT - 1 ? i + 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Demo video badge */}
        <button className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg glass text-xs font-medium text-white hover:bg-white/10 transition-colors">
          <Play className="w-3 h-3 fill-current" /> Watch Demo
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 p-3">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex-1 aspect-video rounded-lg bg-[#18191C] border-2 transition-colors flex items-center justify-center ${
              activeIndex === i ? 'border-primary' : 'border-transparent hover:border-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-white/15" />
          </button>
        ))}
      </div>
    </div>
  );
}

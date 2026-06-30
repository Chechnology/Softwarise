'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MonetizeHero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
      <div className="container-narrow relative text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-8">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">Software Monetization</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Turn visibility into <span className="text-gradient-gold">revenue.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-[#A1A1AA] mb-10 max-w-lg mx-auto leading-relaxed">
          Feature your listings, run sponsored placements, sell lifetime access deals, and tap into our advertising marketplace.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link href="/monetize/featured" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-glow">
            Explore Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 border-y border-white/[0.06]" />
      <div className="container-narrow relative text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/6 mb-8">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm text-primary font-medium">Start in minutes. No credit card required.</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">Your software empire<br /><span className="text-gradient-gold">starts here.</span></h2>
          <p className="text-lg text-[#A1A1AA] mb-10 max-w-lg mx-auto leading-relaxed">Join 2,400+ founders, buyers, investors, and agencies already building the software economy on Softwarise.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-glow hover:-translate-y-0.5">
              Create Free Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/marketplace" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/6 border border-white/12 text-white font-medium text-base hover:bg-white/10 transition-all">Browse Marketplace</Link>
          </div>
          <div className="mt-14 pt-10 border-t border-white/[0.08]">
            <p className="text-xs tracking-luxury text-[#A1A1AA] mb-6">Trusted by teams from</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {['Flutterwave', 'Paystack', 'Andela', 'Interswitch', 'PiggyVest', 'Moniepoint'].map((brand) => (
                <span key={brand} className="text-sm font-medium text-white/20 hover:text-white/40 transition-colors">{brand}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

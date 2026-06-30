'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useRef } from 'react';

const FLOATING_CARDS = [
  {
    label: 'E-Commerce SaaS',
    price: '$420,000',
    mrr: '$14,200 MRR',
    growth: '+28%',
    badge: 'Featured',
    x: '-left-6',
    y: 'top-20',
    delay: 0,
  },
  {
    label: 'Mobile Analytics App',
    price: '$185,000',
    mrr: '$6,800 MRR',
    growth: '+41%',
    badge: 'New',
    x: '-right-6',
    y: 'top-32',
    delay: 0.4,
  },
  {
    label: 'Series A Round',
    price: '$2.5M Goal',
    mrr: '$88K ARR',
    growth: '12% Equity',
    badge: 'Fundraising',
    x: '-left-10',
    y: 'bottom-24',
    delay: 0.8,
  },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div style={{ y, opacity }} className="container-wide relative z-10 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/6 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wide">
                Africa&apos;s Premier Software Economy
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold text-[#FFFFFF] mb-6 leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Where Software{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient-gold">Becomes</span>
              {' '}Opportunity.
            </motion.h1>

            {/* Sub-headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-10"
            >
              {[
                'Buy software.',
                'Sell software.',
                'Raise capital.',
                'Build technology.',
                'Monetize digital assets.',
              ].map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                  className="text-lg text-[#A1A1AA] font-medium leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Link
                href="/marketplace"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/listings/new"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white font-medium text-base hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Start Selling
              </Link>
              <button className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">
                <div className="w-9 h-9 rounded-full border border-white/16 flex items-center justify-center hover:border-white/30 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['#D4AF37', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0B0B0D]"
                    style={{ background: color, opacity: 0.9 }}
                  />
                ))}
              </div>
              <p className="text-sm text-[#A1A1AA]">
                <span className="text-white font-semibold">2,400+</span> founders, buyers & investors
              </p>
            </motion.div>
          </div>

          {/* Right — Floating UI */}
          <div className="flex-1 relative h-[520px] hidden lg:block">
            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 mx-auto w-[380px] left-1/2 -translate-x-1/2"
            >
              <div className="surface rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="tracking-luxury text-[#A1A1AA] mb-1">Portfolio Value</p>
                    <p className="text-3xl font-bold text-white tracking-tight">$2,847,300</p>
                    <p className="text-sm text-success mt-1">↑ 24.3% this quarter</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <span className="text-primary text-lg">S</span>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="mb-5 h-20 flex items-end gap-1">
                  {[35, 48, 40, 55, 45, 60, 52, 68, 58, 72, 65, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11
                          ? 'linear-gradient(180deg, #D4AF37, #B8922A)'
                          : 'rgba(212, 175, 55, 0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Active deals */}
                <div className="space-y-3">
                  {[
                    { name: 'SaaS CRM Platform', price: '$340K', status: 'In Due Diligence', dot: 'bg-accent' },
                    { name: 'E-Learning App', price: '$89K', status: 'Offer Accepted', dot: 'bg-success' },
                    { name: 'FinTech Startup', price: '$1.2M', status: 'Seed Round', dot: 'bg-primary' },
                  ].map((deal) => (
                    <div key={deal.name} className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${deal.dot}`} />
                        <span className="text-sm text-white font-medium">{deal.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{deal.price}</p>
                        <p className="text-xs text-[#A1A1AA]">{deal.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating listing cards */}
            {FLOATING_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ animationDelay: `${card.delay}s` }}
                className={`absolute ${card.x} ${card.y} w-52 animate-float`}
              >
                <div className="glass rounded-xl p-4 shadow-xl border border-white/[0.1]">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs font-medium text-white leading-tight">{card.label}</p>
                    <span className={`badge ${card.badge === 'Featured' ? 'badge-gold' : card.badge === 'New' ? 'badge-blue' : 'badge-green'} text-[10px]`}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white mb-1">{card.price}</p>
                  <p className="text-xs text-[#A1A1AA]">{card.mrr}</p>
                  <div className="mt-2 text-xs font-medium text-success">{card.growth}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none" />
    </section>
  );
}

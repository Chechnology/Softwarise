'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, duration = 2000, isActive = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, isActive]);

  return count;
}

const STATS = [
  { value: 2847, suffix: '+', label: 'Active Members', sublabel: 'Buyers, sellers & investors' },
  { value: 1240, suffix: '+', label: 'Listings Live', sublabel: 'Verified software assets' },
  { value: 48, suffix: 'M+', label: 'GMV Transacted', sublabel: 'USD across all verticals', prefix: '$' },
  { value: 94, suffix: '+', label: 'Active Investors', sublabel: 'Angels, VCs & family offices' },
  { value: 340, suffix: '+', label: 'Deals Closed', sublabel: 'Acquisitions & investments' },
  { value: 180, suffix: '+', label: 'Vetted Agencies', sublabel: 'In our development network' },
];

interface PlatformStatsProps {
  stats?: Record<string, number> | null;
}

export function PlatformStats({ stats }: PlatformStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B0B0D 0%, #0F0F12 50%, #0B0B0D 100%)',
      }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="tracking-luxury text-primary mb-4"
          >
            By The Numbers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
          >
            The software economy, quantified
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={i}
              isActive={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  isActive,
}: {
  stat: typeof STATS[0];
  index: number;
  isActive: boolean;
}) {
  const count = useCountUp(stat.value, 1800, isActive);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.08 }}
      className="bg-[#0B0B0D] p-8 lg:p-10 flex flex-col justify-center group hover:bg-[#111214] transition-colors duration-300"
    >
      <p className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
        {stat.prefix || ''}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="text-base font-medium text-white mb-1">{stat.label}</p>
      <p className="text-sm text-[#A1A1AA]">{stat.sublabel}</p>
    </motion.div>
  );
}

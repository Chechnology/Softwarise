'use client';

import { motion } from 'framer-motion';

const PLACEMENTS = [
  { name: 'Homepage Hero', reach: '48K monthly views', price: '$800/wk' },
  { name: 'Homepage Featured', reach: '32K monthly views', price: '$450/wk' },
  { name: 'Marketplace Sidebar', reach: '21K monthly views', price: '$250/wk' },
  { name: 'Newsletter Placement', reach: '18K subscribers', price: '$300/issue' },
];

export function AdPlacementShowcase() {
  return (
    <section className="py-20 bg-[#0D0D0F] border-t border-white/[0.06]">
      <div className="container-wide">
        <div className="text-center mb-14">
          <p className="tracking-luxury text-primary mb-3">Inventory</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Advertising placements</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLACEMENTS.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="surface rounded-2xl p-6 text-center">
              <p className="text-sm font-semibold text-white mb-2">{p.name}</p>
              <p className="text-xs text-[#A1A1AA] mb-4">{p.reach}</p>
              <p className="text-xl font-bold text-primary">{p.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

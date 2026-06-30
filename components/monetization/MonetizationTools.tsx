'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Megaphone, Gift, Handshake, ArrowRight } from 'lucide-react';

const TOOLS = [
  { icon: Star, title: 'Featured Listings', description: 'Boost your listing to the top of search results and the homepage for 7, 14, or 30 days.', price: 'From $49', href: '/monetize/featured', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Megaphone, title: 'Advertising Marketplace', description: 'Purchase homepage hero, sidebar, and newsletter placements to reach qualified buyers.', price: 'From $200/wk', href: '/monetize/advertise', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: Gift, title: 'Lifetime Deals', description: 'Run a lifetime access promotion to generate upfront revenue and acquire new customers fast.', price: '5% platform fee', href: '/monetize/ltd', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Handshake, title: 'Sponsorships', description: 'Connect with brands and communities for sponsored content and co-marketing opportunities.', price: 'Custom pricing', href: '/monetize/sponsor', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export function MonetizationTools() {
  return (
    <section className="py-20 border-t border-white/[0.06]">
      <div className="container-wide">
        <div className="text-center mb-14">
          <p className="tracking-luxury text-primary mb-3">Tools</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Monetization toolkit</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={tool.href}>
                <div className="card p-7 h-full group cursor-pointer">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center`}>
                      <tool.icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{tool.description}</p>
                  <span className="text-sm font-medium text-primary">{tool.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

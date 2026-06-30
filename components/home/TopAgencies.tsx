'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight, MapPin } from 'lucide-react';

const AGENCIES = [
  {
    name: 'Stackhaus Labs', country: 'Nigeria', tagline: 'Full-stack SaaS development & AI integration',
    skills: ['Next.js', 'Supabase', 'OpenAI', 'AWS'], rating: 4.9, projects: 84, team: 16,
    initials: 'SL', color: 'from-primary/20 to-primary/5',
  },
  {
    name: 'BuildWave Africa', country: 'Kenya', tagline: 'Mobile-first products for African markets',
    skills: ['Flutter', 'React Native', 'Firebase', 'Python'], rating: 4.8, projects: 62, team: 12,
    initials: 'BW', color: 'from-accent/20 to-accent/5',
  },
  {
    name: 'CodeCraft Studios', country: 'Ghana', tagline: 'Enterprise software & custom solutions',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'], rating: 4.9, projects: 107, team: 24,
    initials: 'CC', color: 'from-violet-500/20 to-violet-500/5',
  },
  {
    name: 'Fintech Forge', country: 'South Africa', tagline: 'Payments, compliance & banking tech',
    skills: ['Go', 'Stripe', 'Kafka', 'Kubernetes'], rating: 4.7, projects: 45, team: 20,
    initials: 'FF', color: 'from-emerald-500/20 to-emerald-500/5',
  },
];

export function TopAgencies() {
  return (
    <section className="py-24 bg-[#0D0D0F] border-y border-white/[0.06]">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="tracking-luxury text-primary mb-3">Build</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Top Development Agencies</motion.h2>
          </div>
          <Link href="/build/agencies" className="hidden sm:flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-primary transition-colors font-medium">
            View all agencies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AGENCIES.map((agency, i) => (
            <motion.div key={agency.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href="/build/agencies">
                <div className="card p-5 h-full group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agency.color} border border-white/[0.08] flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs font-bold text-white">{agency.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{agency.name}</p>
                      <span className="flex items-center gap-1 text-xs text-[#A1A1AA]"><MapPin className="w-3 h-3" />{agency.country}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mb-4 leading-relaxed line-clamp-2">{agency.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agency.skills.slice(0, 3).map((s) => (<span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/6 text-[#A1A1AA] border border-white/[0.06]">{s}</span>))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-primary text-primary" /><span className="text-xs font-semibold text-white">{agency.rating}</span></div>
                    <span className="text-xs text-[#A1A1AA]">{agency.projects} projects</span>
                    <span className="text-xs text-[#A1A1AA]">{agency.team} team</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

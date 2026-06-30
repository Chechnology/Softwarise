'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  { quote: "Softwarise is the infrastructure layer the African software economy has been waiting for. We closed a $340K acquisition in 3 weeks — no brokers, no friction.", name: 'Adaora Chukwu', title: 'Founder, PayStream Nigeria', role: 'Seller', initials: 'AC', color: 'bg-primary' },
  { quote: "As an investor focused on African tech, I needed deal flow. Softwarise gave me direct access to 20 qualified startups in my first month. Three term sheets sent.", name: 'Kwame Asante', title: 'Partner, Volta Capital', role: 'Investor', initials: 'KA', color: 'bg-accent' },
  { quote: "We used the manufacturing marketplace to build our entire SaaS product — from spec to deployment in 8 weeks. The escrow system gave us total confidence.", name: 'Nnamdi Okafor', title: 'CEO, LogisticsHub', role: 'Client', initials: 'NO', color: 'bg-violet-500' },
  { quote: "Featured our listing on Softwarise and received 14 qualified enquiries in the first week. Sold to a European buyer within 6 weeks at asking price. Remarkable.", name: 'Fatima Al-Hassan', title: 'Co-founder, EduTrack', role: 'Seller', initials: 'FA', color: 'bg-emerald-500' },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-wide">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="tracking-luxury text-primary mb-4">Testimonials</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Trusted by the builders,<br />buyers & backers</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="surface rounded-2xl p-7 relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.04]" />
              <p className="text-[#A1A1AA] leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}><span className="text-white text-xs font-bold">{t.initials}</span></div>
                <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-[#A1A1AA]">{t.title}</p></div>
                <span className="ml-auto badge badge-gold text-[10px]">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with the basics',
    features: [
      '3 active listings',
      'Basic marketplace access',
      'Standard messaging',
      'Community support',
      '5% transaction fee',
    ],
    cta: 'Get Started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For serious builders and sellers',
    features: [
      'Unlimited listings',
      'Featured listing placement',
      'AI listing optimization',
      'Priority support',
      'Due diligence vault',
      '3% transaction fee',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For agencies, funds, and platforms',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-glove onboarding',
      '1.5% transaction fee',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="container-default py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tracking-luxury text-primary mb-4">
          Pricing
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
          Simple, transparent pricing
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
          Choose the plan that fits where you are in your software economy journey.
        </motion.p>

        {/* Annual toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-[#A1A1AA]'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`w-12 h-6 rounded-full transition-colors relative ${annual ? 'bg-primary' : 'bg-white/[0.1]'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-[#A1A1AA]'}`}>
            Annual <span className="text-primary">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`rounded-2xl p-8 flex flex-col ${
              tier.highlighted
                ? 'card-gold border-2 border-primary/40 relative shadow-glow'
                : 'surface'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-[#0B0B0D] text-xs font-bold">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}

            <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
            <p className="text-sm text-[#A1A1AA] mb-6">{tier.description}</p>

            <div className="mb-6">
              {tier.price === null ? (
                <p className="text-3xl font-bold text-white">Custom</p>
              ) : (
                <p className="text-4xl font-bold text-white">
                  ${annual ? Math.round(tier.price * 0.8) : tier.price}
                  <span className="text-base font-normal text-[#A1A1AA]">/mo</span>
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#A1A1AA]">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.href}
              className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                tier.highlighted
                  ? 'bg-primary text-[#0B0B0D] hover:bg-primary/90 hover:shadow-glow'
                  : 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]'
              }`}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* FAQ teaser */}
      <div className="text-center mt-16">
        <p className="text-sm text-[#A1A1AA]">
          Questions about pricing?{' '}
          <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors font-medium">
            Talk to our team →
          </Link>
        </p>
      </div>
    </div>
  );
}

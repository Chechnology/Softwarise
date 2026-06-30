'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, Upload, Sparkles, Loader2,
  DollarSign, Globe, FileText, Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { CATEGORY_LABELS, COUNTRIES, TECH_STACKS } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const STEPS = [
  { id: 1, label: 'Basics', icon: FileText },
  { id: 2, label: 'Financials', icon: DollarSign },
  { id: 3, label: 'Details', icon: Globe },
  { id: 4, label: 'Media', icon: ImageIcon },
  { id: 5, label: 'Review', icon: Check },
];

interface FormData {
  title: string;
  category: string;
  short_description: string;
  description: string;
  asking_price: string;
  monthly_revenue: string;
  monthly_profit: string;
  monthly_traffic: string;
  total_users: string;
  growth_rate: string;
  established_year: string;
  tech_stack: string[];
  country: string;
  demo_url: string;
}

const INITIAL_DATA: FormData = {
  title: '',
  category: 'saas',
  short_description: '',
  description: '',
  asking_price: '',
  monthly_revenue: '',
  monthly_profit: '',
  monthly_traffic: '',
  total_users: '',
  growth_rate: '',
  established_year: '',
  tech_stack: [],
  country: '',
  demo_url: '',
};

export function ListingCreationWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [aiLoading, setAiLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const update = (fields: Partial<FormData>) => setData((prev) => ({ ...prev, ...fields }));

  const toggleTech = (tech: string) => {
    setData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  };

  const handleAIOptimize = async () => {
    if (!data.title || !data.description) {
      toast.error('Add a title and description first');
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch('/api/listings/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          category: data.category,
          asking_price: Number(data.asking_price) || 0,
          monthly_revenue: Number(data.monthly_revenue) || undefined,
          tech_stack: data.tech_stack,
        }),
      });
      const result = await res.json();
      if (result.data) {
        update({
          title: result.data.title,
          short_description: result.data.short_description,
          description: result.data.description,
        });
        toast.success('Listing optimized with AI!');
      }
    } catch {
      toast.error('AI optimization failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create listing');
      const result = await res.json();
      toast.success('Listing submitted for review!');
      router.push(`/listings/${result.data?.id || ''}`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step > s.id
                    ? 'bg-primary border-primary'
                    : step === s.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/[0.1] bg-white/[0.02]'
                }`}
              >
                {step > s.id ? (
                  <Check className="w-4 h-4 text-[#0B0B0D]" />
                ) : (
                  <s.icon className={`w-4 h-4 ${step === s.id ? 'text-primary' : 'text-[#A1A1AA]'}`} />
                )}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? 'text-white' : 'text-[#A1A1AA]'}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-6 ${step > s.id ? 'bg-primary' : 'bg-white/[0.1]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form content */}
      <div className="surface rounded-2xl p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Tell us about your product</h2>
              <p className="text-sm text-[#A1A1AA] mb-6">Start with the basics — you can refine these later.</p>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. E-Commerce Analytics SaaS"
                  value={data.title}
                  onChange={(e) => update({ title: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Category</label>
                <select value={data.category} onChange={(e) => update({ category: e.target.value })} className="input">
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value} className="bg-[#18191C]">{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Short Description <span className="text-[#A1A1AA] font-normal">(max 280 chars)</span></label>
                <input
                  type="text"
                  placeholder="A one-line pitch for your listing"
                  value={data.short_description}
                  onChange={(e) => update({ short_description: e.target.value.slice(0, 280) })}
                  className="input"
                />
                <p className="text-xs text-[#A1A1AA] mt-1">{data.short_description.length}/280</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-white font-medium">Full Description</label>
                  <button
                    type="button"
                    onClick={handleAIOptimize}
                    disabled={aiLoading}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    AI Optimize
                  </button>
                </div>
                <textarea
                  placeholder="Describe your product, its history, customer base, and what makes it valuable..."
                  value={data.description}
                  onChange={(e) => update({ description: e.target.value })}
                  rows={6}
                  className="input resize-none"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Financial details</h2>
              <p className="text-sm text-[#A1A1AA] mb-6">Accurate numbers build buyer trust and speed up due diligence.</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Asking Price (USD)</label>
                  <input type="number" placeholder="340000" value={data.asking_price} onChange={(e) => update({ asking_price: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Monthly Revenue (USD)</label>
                  <input type="number" placeholder="12600" value={data.monthly_revenue} onChange={(e) => update({ monthly_revenue: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Monthly Profit (USD)</label>
                  <input type="number" placeholder="7400" value={data.monthly_profit} onChange={(e) => update({ monthly_profit: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Growth Rate (% MoM)</label>
                  <input type="number" placeholder="28" value={data.growth_rate} onChange={(e) => update({ growth_rate: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Monthly Traffic</label>
                  <input type="number" placeholder="28000" value={data.monthly_traffic} onChange={(e) => update({ monthly_traffic: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm text-white font-medium mb-2 block">Total Users</label>
                  <input type="number" placeholder="840" value={data.total_users} onChange={(e) => update({ total_users: e.target.value })} className="input" />
                </div>
              </div>

              {Number(data.asking_price) > 0 && Number(data.monthly_revenue) > 0 && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/15 mt-2">
                  <span className="text-sm text-[#A1A1AA]">Calculated Revenue Multiple</span>
                  <span className="text-lg font-bold text-primary">
                    {(Number(data.asking_price) / (Number(data.monthly_revenue) * 12)).toFixed(1)}x
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Technical & location details</h2>
              <p className="text-sm text-[#A1A1AA] mb-6">Help buyers understand the technical footprint.</p>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Established Year</label>
                <input type="number" placeholder="2022" value={data.established_year} onChange={(e) => update({ established_year: e.target.value })} className="input" />
              </div>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Country</label>
                <select value={data.country} onChange={(e) => update({ country: e.target.value })} className="input">
                  <option value="" className="bg-[#18191C]">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-[#18191C]">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Demo URL (optional)</label>
                <input type="url" placeholder="https://demo.yourproduct.com" value={data.demo_url} onChange={(e) => update({ demo_url: e.target.value })} className="input" />
              </div>

              <div>
                <label className="text-sm text-white font-medium mb-2 block">Tech Stack</label>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACKS.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        data.tech_stack.includes(tech)
                          ? 'bg-primary/15 border-primary/40 text-primary'
                          : 'bg-white/[0.03] border-white/[0.08] text-[#A1A1AA] hover:border-white/20'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Add screenshots & media</h2>
              <p className="text-sm text-[#A1A1AA] mb-6">Listings with screenshots get 3x more buyer interest.</p>

              <div className="border-2 border-dashed border-white/[0.12] rounded-2xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-[#A1A1AA] mx-auto mb-4" />
                <p className="text-sm font-medium text-white mb-1">Drag & drop your screenshots here</p>
                <p className="text-xs text-[#A1A1AA]">PNG, JPG up to 10MB each. Up to 8 images.</p>
                <button type="button" className="mt-4 btn btn-secondary text-sm">Browse Files</button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Review your listing</h2>
              <p className="text-sm text-[#A1A1AA] mb-6">Confirm the details below before submitting for review.</p>

              <div className="space-y-3">
                {[
                  ['Title', data.title || '—'],
                  ['Category', CATEGORY_LABELS[data.category]],
                  ['Asking Price', data.asking_price ? `$${Number(data.asking_price).toLocaleString()}` : '—'],
                  ['Monthly Revenue', data.monthly_revenue ? `$${Number(data.monthly_revenue).toLocaleString()}` : '—'],
                  ['Country', data.country || '—'],
                  ['Tech Stack', data.tech_stack.join(', ') || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-sm text-[#A1A1AA]">{label}</span>
                    <span className="text-sm text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-accent/8 border border-accent/20 mt-6">
                <p className="text-xs text-accent">
                  Your listing will be reviewed by our team within 24 hours before going live on the marketplace.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

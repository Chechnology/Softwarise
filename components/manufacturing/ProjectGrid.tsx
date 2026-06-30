'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Users } from 'lucide-react';
import { formatCurrency, timeAgo, PROJECT_CATEGORY_LABELS } from '@/lib/utils';
import type { ProjectRequest } from '@/types';

const DEMO_PROJECTS: Partial<ProjectRequest>[] = [
  { id: '1', title: 'Build a B2B Invoicing SaaS Platform', category: 'saas', description: 'Looking for an experienced team to build a complete invoicing and expense management SaaS for SMEs across West Africa.', budget_min: 25000, budget_max: 45000, timeline_weeks: 12, skills_required: ['Next.js', 'Supabase', 'Stripe'], proposals_count: 8, created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: '2', title: 'Mobile Banking App for Rural Communities', category: 'mobile_app', description: 'Need a Flutter developer to build an offline-first banking app targeting underbanked rural populations.', budget_min: 18000, budget_max: 32000, timeline_weeks: 16, skills_required: ['Flutter', 'Firebase', 'USSD'], proposals_count: 12, created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString() },
  { id: '3', title: 'AI-Powered Customer Support Chatbot', category: 'ai_product', description: 'Build an AI chatbot integration for our e-commerce platform using OpenAI with custom training data.', budget_min: 8000, budget_max: 15000, timeline_weeks: 6, skills_required: ['OpenAI', 'Python', 'React'], proposals_count: 19, created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() },
  { id: '4', title: 'Enterprise HR Management System', category: 'enterprise_software', description: 'Comprehensive HR platform with payroll, leave management, and performance review modules for a 500+ employee company.', budget_min: 45000, budget_max: 80000, timeline_weeks: 20, skills_required: ['React', 'Node.js', 'PostgreSQL'], proposals_count: 6, created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString() },
  { id: '5', title: 'E-Commerce Storefront Migration', category: 'ecommerce', description: 'Migrate existing WooCommerce store to a custom Next.js storefront with improved performance and SEO.', budget_min: 12000, budget_max: 22000, timeline_weeks: 8, skills_required: ['Next.js', 'Shopify', 'SEO'], proposals_count: 15, created_at: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString() },
  { id: '6', title: 'Real-Time Logistics Tracking Dashboard', category: 'data_analytics', description: 'Build a real-time dashboard for tracking fleet locations, delivery status, and analytics for a logistics company.', budget_min: 20000, budget_max: 38000, timeline_weeks: 10, skills_required: ['React', 'WebSockets', 'PostgreSQL'], proposals_count: 9, created_at: new Date(Date.now() - 1000 * 60 * 60 * 95).toISOString() },
];

export function ProjectGrid({ projects }: { projects: Partial<ProjectRequest>[] }) {
  const display = projects.length > 0 ? projects : DEMO_PROJECTS;

  return (
    <div className="grid grid-cols-1 gap-4">
      {display.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link href={`/build/${project.id}`}>
            <div className="card p-6 group cursor-pointer">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-blue">{PROJECT_CATEGORY_LABELS[project.category || 'saas']}</span>
                    <span className="text-xs text-[#A1A1AA]">{timeAgo(project.created_at || new Date())}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.skills_required?.map((skill) => (
                      <span key={skill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-[#A1A1AA] border border-white/[0.08]">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 lg:gap-3 lg:min-w-[180px] lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                  <div>
                    <p className="text-xs text-[#A1A1AA] mb-0.5">Budget</p>
                    <p className="text-base font-semibold text-white flex items-center gap-1 lg:justify-end">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {formatCurrency(project.budget_min || 0, 'USD', true)}–{formatCurrency(project.budget_max || 0, 'USD', true)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 lg:justify-end">
                    <span className="flex items-center gap-1 text-xs text-[#A1A1AA]"><Clock className="w-3.5 h-3.5" />{project.timeline_weeks}w</span>
                    <span className="flex items-center gap-1 text-xs text-[#A1A1AA]"><Users className="w-3.5 h-3.5" />{project.proposals_count} proposals</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

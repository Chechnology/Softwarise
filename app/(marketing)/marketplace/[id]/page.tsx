import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ListingGallery } from '@/components/marketplace/ListingGallery';
import { ListingMetricsPanel } from '@/components/marketplace/ListingMetricsPanel';
import { ListingSidebar } from '@/components/marketplace/ListingSidebar';
import { ListingTabs } from '@/components/marketplace/ListingTabs';
import { CATEGORY_LABELS, formatCurrency } from '@/lib/utils';
import { Globe, BadgeCheck, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Listing #${id}`,
    description: 'Premium software business for sale on Softwarise.',
  };
}

// Demo data fallback for preview purposes
const DEMO_LISTING = {
  id: '1',
  title: 'E-Commerce Analytics SaaS',
  category: 'saas' as const,
  short_description: 'Profitable analytics platform serving 840 e-commerce stores with 94% retention.',
  description: `This is a fully-bootstrapped B2B SaaS analytics platform built specifically for Shopify and WooCommerce store owners. The product has been in market for 3 years with consistent month-over-month growth.

Key highlights:
— 840 paying customers across 34 countries
— 94% annual retention rate (industry-leading)
— Fully automated billing and onboarding
— Clean, well-documented codebase
— Remote team of 2 contractors (optional transition)

The business has never raised outside capital and has been profitable since month 4. All financials are independently verified and available for due diligence.`,
  asking_price: 340000,
  monthly_revenue: 12600,
  monthly_profit: 7400,
  annual_revenue: 151200,
  monthly_traffic: 28000,
  total_users: 840,
  active_users: 790,
  growth_rate: 28,
  established_year: 2022,
  tech_stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
  country: 'Nigeria',
  demo_url: 'https://demo.example.com',
  views_count: 1240,
  saves_count: 47,
  offers_count: 6,
  verified_financials: true,
  due_diligence_available: true,
  seller: { full_name: 'Adaora Chukwu', avatar_url: null },
};

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*, seller:users(full_name, avatar_url), assets:listing_assets(*)')
    .eq('id', id)
    .single();

  const display = listing || DEMO_LISTING;

  return (
    <div className="container-wide py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#A1A1AA] mb-6">
        <span>Marketplace</span>
        <span>/</span>
        <span>{CATEGORY_LABELS[display.category]}</span>
        <span>/</span>
        <span className="text-white">{display.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge badge-gold">{CATEGORY_LABELS[display.category]}</span>
            {display.verified_financials && (
              <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
                <BadgeCheck className="w-4 h-4" /> Verified Financials
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
              <Globe className="w-3.5 h-3.5" /> {display.country}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
              <Calendar className="w-3.5 h-3.5" /> Est. {display.established_year}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            {display.title}
          </h1>
          <p className="text-[#A1A1AA] max-w-2xl leading-relaxed">{display.short_description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <ListingGallery />
          <ListingMetricsPanel listing={display} />
          <ListingTabs listing={display} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ListingSidebar listing={display} />
        </div>
      </div>
    </div>
  );
}

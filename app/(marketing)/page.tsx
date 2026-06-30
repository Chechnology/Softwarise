import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TickerBar } from '@/components/home/TickerBar';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { InvestmentOpportunities } from '@/components/home/InvestmentOpportunities';
import { PlatformPillars } from '@/components/home/PlatformPillars';
import { TopAgencies } from '@/components/home/TopAgencies';
import { PlatformStats } from '@/components/home/PlatformStats';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Softwarise — Where Software Becomes Opportunity',
  description: 'Buy software, sell software, raise capital, build technology, and monetize digital assets. The premier software economy platform.',
};

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: featuredListings }, { data: startups }, { data: stats }] = await Promise.all([
    supabase
      .from('listings')
      .select('*, seller:users(full_name, avatar_url)')
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('startup_profiles')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(4),
    supabase.from('platform_stats').select('*').single(),
  ]);

  return (
    <>
      <HeroSection />
      <TickerBar />
      <PlatformPillars />
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedListings listings={featuredListings ?? []} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <InvestmentOpportunities startups={startups ?? []} />
      </Suspense>
      <PlatformStats stats={stats} />
      <TopAgencies />
      <Testimonials />
      <CTASection />
    </>
  );
}

function SectionSkeleton() {
  return (
    <div className="py-24 container-wide">
      <div className="h-8 w-48 rounded-lg shimmer mb-12" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-2xl shimmer" />
        ))}
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { InvestHeader } from '@/components/investments/InvestHeader';
import { StartupGrid } from '@/components/investments/StartupGrid';
import { InvestFilters } from '@/components/investments/InvestFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invest — Discover Software Startups',
  description: 'Browse fundraising software startups across Africa and beyond. Connect directly with founders.',
};

interface InvestPageProps {
  searchParams: Promise<{ stage?: string; industry?: string; search?: string }>;
}

export default async function InvestPage({ searchParams }: InvestPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from('startup_profiles').select('*').eq('is_active', true);

  if (params.stage) query = query.eq('stage', params.stage);
  if (params.industry) query = query.eq('industry', params.industry);
  if (params.search) query = query.textSearch('search_vector', params.search);

  const { data: startups, count } = await query.order('created_at', { ascending: false }).limit(20);

  return (
    <div className="container-wide py-10">
      <InvestHeader totalCount={count ?? startups?.length ?? 0} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <aside className="lg:w-72 flex-shrink-0">
          <InvestFilters />
        </aside>
        <div className="flex-1 min-w-0">
          <StartupGrid startups={startups ?? []} />
        </div>
      </div>
    </div>
  );
}

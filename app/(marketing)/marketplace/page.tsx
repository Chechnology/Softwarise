import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceGrid';
import type { Metadata } from 'next';
import type { ListingCategory } from '@/types';

export const metadata: Metadata = {
  title: 'Marketplace — Buy & Sell Software',
  description: 'Browse verified SaaS products, mobile apps, websites, domains, and software businesses for sale.',
};

interface MarketplacePageProps {
  searchParams: Promise<{
    category?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
    search?: string;
    view?: string;
  }>;
}

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('listings')
    .select('*, seller:users(full_name, avatar_url)')
    .eq('status', 'active');

  if (params.category) {
    query = query.eq('category', params.category as ListingCategory);
  }
  if (params.min_price) {
    query = query.gte('asking_price', Number(params.min_price));
  }
  if (params.max_price) {
    query = query.lte('asking_price', Number(params.max_price));
  }
  if (params.search) {
    query = query.textSearch('search_vector', params.search);
  }

  const sortMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    price_asc: { column: 'asking_price', ascending: true },
    price_desc: { column: 'asking_price', ascending: false },
    revenue_desc: { column: 'monthly_revenue', ascending: false },
  };
  const sort = sortMap[params.sort || 'newest'];
  query = query.order(sort.column, { ascending: sort.ascending });

  const { data: listings, count } = await query.limit(24);

  return (
    <div className="container-wide py-10">
      <MarketplaceHeader totalCount={count ?? listings?.length ?? 0} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Filters sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <MarketplaceFilters />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={<GridSkeleton />}>
            <MarketplaceGrid listings={listings ?? []} view={params.view as 'grid' | 'table' | undefined} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-80 rounded-2xl shimmer" />
      ))}
    </div>
  );
}

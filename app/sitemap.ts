import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://softwarise.io';
  const supabase = await createClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/invest`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/build`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/monetize`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  try {
    const { data: listings } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'active')
      .limit(1000);

    const { data: startups } = await supabase
      .from('startup_profiles')
      .select('id, updated_at')
      .eq('is_active', true)
      .limit(1000);

    const listingRoutes: MetadataRoute.Sitemap = (listings || []).map((listing) => ({
      url: `${baseUrl}/marketplace/${listing.id}`,
      lastModified: new Date(listing.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const startupRoutes: MetadataRoute.Sitemap = (startups || []).map((startup) => ({
      url: `${baseUrl}/invest/${startup.id}`,
      lastModified: new Date(startup.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...listingRoutes, ...startupRoutes];
  } catch {
    return staticRoutes;
  }
}

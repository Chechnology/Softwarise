import { MonetizeHero } from '@/components/monetization/MonetizeHero';
import { MonetizationTools } from '@/components/monetization/MonetizationTools';
import { AdPlacementShowcase } from '@/components/monetization/AdPlacementShowcase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monetize — Generate Revenue From Software',
  description: 'Feature your listings, run sponsored placements, sell lifetime deals, and access advertising inventory.',
};

export default function MonetizePage() {
  return (
    <div>
      <MonetizeHero />
      <MonetizationTools />
      <AdPlacementShowcase />
    </div>
  );
}

import { ListingCreationWizard } from '@/components/dashboard/ListingCreationWizard';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Create a Listing' };

export default function NewListingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="tracking-luxury text-primary mb-2">Sell on Softwarise</p>
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Create a New Listing</h1>
        <p className="text-sm text-[#A1A1AA] mt-2">
          List your software business to thousands of qualified buyers. Our AI will help optimize your listing for maximum visibility.
        </p>
      </div>
      <ListingCreationWizard />
    </div>
  );
}

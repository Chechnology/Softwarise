import Link from 'next/link';
import { Plus, Users, Building2 } from 'lucide-react';

export function BuildHeader({ totalCount }: { totalCount: number }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="tracking-luxury text-primary mb-2">Manufacturing</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Software Build Requests
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            {totalCount.toLocaleString()} open projects · Milestone-based escrow protection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/build/agencies" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 border border-white/12 text-white text-sm font-medium hover:bg-white/10 transition-all whitespace-nowrap">
            <Building2 className="w-4 h-4" /> Agencies
          </Link>
          <Link href="/build/freelancers" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 border border-white/12 text-white text-sm font-medium hover:bg-white/10 transition-all whitespace-nowrap">
            <Users className="w-4 h-4" /> Freelancers
          </Link>
          <Link href="/build/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Post Project
          </Link>
        </div>
      </div>
    </div>
  );
}

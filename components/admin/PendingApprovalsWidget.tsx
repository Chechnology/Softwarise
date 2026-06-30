'use client';

import Link from 'next/link';
import { Check, X, Clock } from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { toast } from 'sonner';

interface PendingListing {
  id: string;
  title: string;
  seller?: { full_name: string | null } | null;
  asking_price: number;
  created_at: string;
}

const DEMO: PendingListing[] = [
  { id: '1', title: 'Recipe Sharing Platform', seller: { full_name: 'Tobi Adeyemi' }, asking_price: 45000, created_at: new Date(Date.now() - 1000*60*60*2).toISOString() },
  { id: '2', title: 'Fitness Tracking App', seller: { full_name: 'Chiamaka Eze' }, asking_price: 67000, created_at: new Date(Date.now() - 1000*60*60*5).toISOString() },
  { id: '3', title: 'Invoice Generator Tool', seller: { full_name: 'Daniel Mensah' }, asking_price: 28000, created_at: new Date(Date.now() - 1000*60*60*9).toISOString() },
];

export function PendingApprovalsWidget({ listings }: { listings: PendingListing[] }) {
  const display = listings.length > 0 ? listings : DEMO;

  const handleApprove = (id: string) => toast.success('Listing approved');
  const handleReject = (id: string) => toast.error('Listing rejected');

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Pending Approvals</h3>
        <span className="badge badge-gold">{display.length} pending</span>
      </div>
      <div className="space-y-3">
        {display.map((listing) => (
          <div key={listing.id} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Link href={`/admin/listings/${listing.id}`} className="text-sm font-medium text-white hover:text-primary transition-colors block mb-1">
              {listing.title}
            </Link>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A1A1AA]">{listing.seller?.full_name} · {formatCurrency(listing.asking_price, 'USD', true)}</span>
              <span className="flex items-center gap-1 text-xs text-[#A1A1AA]"><Clock className="w-3 h-3" />{timeAgo(listing.created_at)}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleApprove(listing.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-colors">
                <Check className="w-3.5 h-3.5" /> Approve
              </button>
              <button onClick={() => handleReject(listing.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-error/10 text-error text-xs font-medium hover:bg-error/20 transition-colors">
                <X className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

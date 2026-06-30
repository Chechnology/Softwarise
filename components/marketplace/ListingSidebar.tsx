'use client';

import { useState } from 'react';
import { Heart, Share2, MessageSquare, ShieldCheck, Eye, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface ListingSidebarProps {
  listing: {
    id?: string;
    asking_price: number;
    views_count: number;
    saves_count: number;
    offers_count: number;
    seller?: { full_name: string | null; avatar_url: string | null } | null;
  };
}

export function ListingSidebar({ listing }: ListingSidebarProps) {
  const [saved, setSaved] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from watchlist' : 'Added to watchlist');
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Offer submitted! The seller will be notified.');
    setShowOfferForm(false);
    setOfferAmount('');
    setOfferMessage('');
  };

  return (
    <div className="space-y-5 lg:sticky lg:top-24">
      {/* Price card */}
      <div className="surface rounded-2xl p-6">
        <p className="text-xs text-[#A1A1AA] mb-1">Asking Price</p>
        <p className="text-3xl font-bold text-white mb-5">{formatCurrency(listing.asking_price)}</p>

        {!showOfferForm ? (
          <div className="space-y-3">
            <button
              onClick={() => setShowOfferForm(true)}
              className="w-full py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow"
            >
              Make an Offer
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] transition-all">
              <MessageSquare className="w-4 h-4" /> Message Seller
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOffer} className="space-y-3">
            <div>
              <label className="text-xs text-[#A1A1AA] mb-1.5 block">Your Offer (USD)</label>
              <input
                type="number"
                placeholder="e.g. 320000"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                required
                className="input"
              />
            </div>
            <div>
              <label className="text-xs text-[#A1A1AA] mb-1.5 block">Message (optional)</label>
              <textarea
                placeholder="Introduce yourself and your acquisition plans..."
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                rows={3}
                className="input resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowOfferForm(false)} className="flex-1 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] transition-all">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all">
                Submit Offer
              </button>
            </div>
          </form>
        )}

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-medium transition-all ${
              saved ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-white/[0.08] text-[#A1A1AA] hover:text-white hover:border-white/20'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/[0.08] text-xs font-medium text-[#A1A1AA] hover:text-white hover:border-white/20 transition-all">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.08] text-xs text-[#A1A1AA]">
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views_count} views</span>
          <span>{listing.offers_count} offers</span>
          <span>{listing.saves_count} saves</span>
        </div>
      </div>

      {/* Seller card */}
      <div className="surface rounded-2xl p-6">
        <p className="text-xs tracking-luxury text-[#A1A1AA] mb-4">Listed By</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
            <span className="text-primary font-semibold">{listing.seller?.full_name?.[0] || 'S'}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{listing.seller?.full_name || 'Softwarise Seller'}</p>
            <span className="flex items-center gap-1 text-xs text-success">
              <ShieldCheck className="w-3 h-3" /> Verified Seller
            </span>
          </div>
        </div>
        <button className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white hover:bg-white/[0.06] transition-colors">
          View Seller Profile
          <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
        </button>
      </div>

      {/* Acquisition room CTA */}
      <div className="card-gold rounded-2xl p-6 text-center">
        <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="text-sm font-medium text-white mb-1">Buyer Protection</p>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          All transactions go through our secure Acquisition Room with escrow and verified due diligence.
        </p>
      </div>
    </div>
  );
}

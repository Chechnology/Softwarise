'use client';

import { useState } from 'react';
import { FileText, Code2, ShieldCheck, Lock } from 'lucide-react';

interface ListingTabsProps {
  listing: {
    description: string;
    tech_stack: string[];
    due_diligence_available: boolean;
    demo_url?: string | null;
  };
}

const TABS = [
  { id: 'description', label: 'Description', icon: FileText },
  { id: 'tech', label: 'Tech Stack', icon: Code2 },
  { id: 'diligence', label: 'Due Diligence', icon: ShieldCheck },
];

export function ListingTabs({ listing }: ListingTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-white/[0.08]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-primary' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose prose-invert max-w-none">
            {listing.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4 whitespace-pre-line text-sm">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {activeTab === 'tech' && (
          <div>
            <p className="text-sm text-[#A1A1AA] mb-4">Technologies used to build and operate this product:</p>
            <div className="flex flex-wrap gap-2">
              {listing.tech_stack.map((tech) => (
                <span key={tech} className="badge badge-blue">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'diligence' && (
          <div>
            {listing.due_diligence_available ? (
              <div className="space-y-3">
                <p className="text-sm text-[#A1A1AA] mb-4">
                  This seller has made the following documents available for verified buyers in the secure Due Diligence Vault:
                </p>
                {[
                  { name: 'Financial Statements (P&L)', locked: true },
                  { name: 'Traffic Analytics Report', locked: true },
                  { name: 'Customer Cohort Analysis', locked: true },
                  { name: 'Technical Architecture Doc', locked: true },
                  { name: 'Source Code Access Agreement', locked: true },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-sm text-white">{doc.name}</span>
                    <Lock className="w-4 h-4 text-[#A1A1AA]" />
                  </div>
                ))}
                <p className="text-xs text-[#A1A1AA] mt-4">
                  Sign an NDA to request access to the Due Diligence Vault for this listing.
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#A1A1AA]">No due diligence materials have been provided for this listing yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

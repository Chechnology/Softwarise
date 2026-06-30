'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, List, Users, CreditCard, BarChart3,
  Megaphone, TrendingUp, Shield, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin/dashboard' },
  { icon: List, label: 'Listings', href: '/admin/listings' },
  { icon: TrendingUp, label: 'Investments', href: '/admin/investments' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: CreditCard, label: 'Transactions', href: '/admin/transactions' },
  { icon: Megaphone, label: 'Advertisements', href: '/admin/advertisements' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
];

export function AdminSidebar({ adminName }: { adminName: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 flex flex-col bg-[#0D0D10] border-r border-white/[0.06]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-sm text-white">Admin Panel</p>
            <p className="text-[10px] text-[#A1A1AA]">Softwarise</p>
          </div>
        </div>
      </div>

      {/* Admin info */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-xs font-semibold">{adminName?.[0] || 'A'}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">{adminName || 'Admin'}</p>
            <p className="text-[10px] text-red-400">Administrator</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive ? 'bg-white/[0.08] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A1A1AA] hover:text-white hover:bg-white/[0.04] transition-all mb-1">
          Exit Admin
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

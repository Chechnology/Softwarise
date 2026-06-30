'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, TrendingUp, Wrench, Zap,
  MessageSquare, Bell, Settings, Wallet, LogOut, Menu, X,
  Plus, List, Users, BarChart2, FileText, Star, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Wallet, label: 'Wallet', href: '/wallet' },
      { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 3 },
      { icon: MessageSquare, label: 'Messages', href: '/messages' },
    ],
  },
  {
    label: 'Marketplace',
    items: [
      { icon: List, label: 'My Listings', href: '/listings' },
      { icon: Plus, label: 'Create Listing', href: '/listings/new' },
      { icon: Star, label: 'Watchlist', href: '/dashboard/watchlist' },
      { icon: ShoppingBag, label: 'Browse Market', href: '/marketplace' },
    ],
  },
  {
    label: 'Investments',
    items: [
      { icon: TrendingUp, label: 'My Investments', href: '/investments' },
      { icon: BarChart2, label: 'Startup Profile', href: '/investments/startup' },
      { icon: Users, label: 'Investor Profile', href: '/investments/investor' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { icon: Wrench, label: 'My Projects', href: '/projects' },
      { icon: Plus, label: 'Post Project', href: '/build/new' },
      { icon: FileText, label: 'Proposals', href: '/projects/proposals' },
    ],
  },
  {
    label: 'Monetize',
    items: [
      { icon: Zap, label: 'Monetization', href: '/monetize' },
      { icon: Crown, label: 'Upgrade Plan', href: '/settings/billing', gold: true },
    ],
  },
];

interface DashboardSidebarProps {
  user: User;
  userData: { full_name: string | null; avatar_url: string | null; role: string } | null;
  profile: { username: string; subscription_tier: string } | null;
}

export function DashboardSidebar({ user, userData, profile }: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm">
            <span className="text-[#0B0B0D] font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-base text-white tracking-tight">Softwarise</span>
        </Link>
      </div>

      {/* User card */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-sm font-semibold">
              {(userData?.full_name || user.email)?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {userData?.full_name || user.email?.split('@')[0]}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                profile?.subscription_tier === 'pro' ? 'bg-primary/20 text-primary' :
                profile?.subscription_tier === 'enterprise' ? 'bg-violet-500/20 text-violet-300' :
                'bg-white/[0.08] text-[#A1A1AA]'
              }`}>
                {profile?.subscription_tier?.toUpperCase() || 'FREE'}
              </span>
              <span className="text-[10px] text-[#A1A1AA] capitalize">{userData?.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 no-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-6">
            <p className="tracking-luxury text-[#A1A1AA] px-3 mb-2">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/15'
                        : item.gold
                        ? 'text-primary/70 hover:text-primary hover:bg-primary/8'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-primary' : '')} />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[#0B0B0D] text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] p-3 space-y-0.5">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-all">
          <Settings className="w-4 h-4" /> Settings
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#0D0D10] border-r border-white/[0.06] z-40">
        <SidebarContent />
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-2xl bg-primary shadow-glow flex items-center justify-center"
      >
        <Menu className="w-5 h-5 text-[#0B0B0D]" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#0D0D10] border-r border-white/[0.06] z-50 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

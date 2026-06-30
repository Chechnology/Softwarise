'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Menu, X, ShoppingBag, TrendingUp,
  Wrench, Zap, LayoutDashboard, Bell, MessageSquare,
  LogOut, Settings, User, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const NAV_ITEMS = [
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: ShoppingBag,
    description: 'Buy & sell software businesses',
    children: [
      { label: 'Browse Listings', href: '/marketplace', description: 'All software assets for sale' },
      { label: 'SaaS Products', href: '/marketplace?category=saas', description: 'Recurring revenue businesses' },
      { label: 'Mobile Apps', href: '/marketplace?category=mobile_app', description: 'iOS & Android applications' },
      { label: 'Domains & Websites', href: '/marketplace?category=website', description: 'Established web properties' },
      { label: 'Source Code', href: '/marketplace?category=source_code', description: 'Ready-made codebases' },
    ],
  },
  {
    label: 'Invest',
    href: '/invest',
    icon: TrendingUp,
    description: 'Fund the next generation',
    children: [
      { label: 'Browse Startups', href: '/invest', description: 'Active fundraising rounds' },
      { label: 'Investor Directory', href: '/invest/investors', description: 'Connect with investors' },
      { label: 'Deal Rooms', href: '/invest/deal-rooms', description: 'Private investment spaces' },
      { label: 'Raise Capital', href: '/invest/raise', description: 'List your startup' },
    ],
  },
  {
    label: 'Build',
    href: '/build',
    icon: Wrench,
    description: 'Commission software creation',
    children: [
      { label: 'Post a Project', href: '/build/new', description: 'Get proposals from experts' },
      { label: 'Find Agencies', href: '/build/agencies', description: 'Vetted development teams' },
      { label: 'Find Freelancers', href: '/build/freelancers', description: 'Independent developers' },
      { label: 'Browse Projects', href: '/build', description: 'Open opportunities' },
    ],
  },
  {
    label: 'Monetize',
    href: '/monetize',
    icon: Zap,
    description: 'Generate revenue from software',
    children: [
      { label: 'Featured Listings', href: '/monetize/featured', description: 'Boost your visibility' },
      { label: 'Advertise', href: '/monetize/advertise', description: 'Reach qualified buyers' },
      { label: 'Sponsorships', href: '/monetize/sponsor', description: 'Brand partnerships' },
      { label: 'Lifetime Deals', href: '/monetize/ltd', description: 'Sell lifetime access' },
    ],
  },
];

export function MainNav({ user }: { user: SupabaseUser | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-strong border-b border-white/[0.08]'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-[#0B0B0D] font-bold text-sm tracking-tight">S</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              Softwarise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname.startsWith(item.href)
                      ? 'text-primary bg-primary/8'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/6'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeDropdown === item.label ? 'rotate-180' : ''
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 glass-strong rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-xs tracking-luxury text-[#A1A1AA]">{item.description}</p>
                        </div>
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-white/6 transition-colors group"
                          >
                            <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{child.label}</span>
                            <span className="text-xs text-[#A1A1AA]">{child.description}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right: Auth / User */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <Link
                  href="/dashboard/notifications"
                  className="relative p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/6 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-[#0B0B0D]" />
                </Link>

                {/* Messages */}
                <Link
                  href="/messages"
                  className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/6 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-white/6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-primary text-xs font-semibold">
                        {user.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <ChevronDown className={cn('w-3.5 h-3.5 text-[#A1A1AA] transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-60 glass-strong rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden"
                        onMouseLeave={() => setUserMenuOpen(false)}
                      >
                        <div className="p-3 border-b border-white/[0.08]">
                          <p className="text-sm font-medium text-white truncate">{user.email}</p>
                          <p className="text-xs text-[#A1A1AA] mt-0.5">Free Plan</p>
                        </div>
                        <div className="p-2">
                          {[
                            { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                            { icon: User, label: 'Profile', href: '/settings/profile' },
                            { icon: Crown, label: 'Upgrade to Pro', href: '/settings/billing', gold: true },
                            { icon: Settings, label: 'Settings', href: '/settings' },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                                item.gold
                                  ? 'text-primary hover:bg-primary/10'
                                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/6'
                              )}
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </Link>
                          ))}
                          <div className="my-1 h-px bg-white/[0.08]" />
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-[#0B0B0D] hover:bg-primary/90 transition-all hover:shadow-glow-sm"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/6 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/[0.08] bg-[#111214] overflow-hidden"
          >
            <div className="container-wide py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-white/6 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </div>
              ))}
              {!user && (
                <div className="pt-3 flex gap-2">
                  <Link href="/login" className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-sm text-[#A1A1AA]">
                    Sign In
                  </Link>
                  <Link href="/signup" className="flex-1 text-center py-2.5 rounded-xl bg-primary text-[#0B0B0D] text-sm font-semibold">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

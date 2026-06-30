import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Marketplace: [
    { label: 'Browse Listings', href: '/marketplace' },
    { label: 'SaaS Products', href: '/marketplace?category=saas' },
    { label: 'Mobile Apps', href: '/marketplace?category=mobile_app' },
    { label: 'Domains', href: '/marketplace?category=domain' },
    { label: 'Source Code', href: '/marketplace?category=source_code' },
    { label: 'Sell Software', href: '/listings/new' },
  ],
  Invest: [
    { label: 'Browse Startups', href: '/invest' },
    { label: 'Investor Directory', href: '/invest/investors' },
    { label: 'Raise Capital', href: '/invest/raise' },
    { label: 'Deal Rooms', href: '/invest/deal-rooms' },
  ],
  Build: [
    { label: 'Post a Project', href: '/build/new' },
    { label: 'Find Agencies', href: '/build/agencies' },
    { label: 'Find Freelancers', href: '/build/freelancers' },
    { label: 'Browse Projects', href: '/build' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
  ],
};

const SOCIAL = [
  { icon: Twitter, href: 'https://twitter.com/softwarise', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/softwarise', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/softwarise', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@softwarise.io', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0B0B0D]">
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-[#0B0B0D] font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg text-white">Softwarise</span>
            </Link>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 max-w-xs">
              The premier software economy platform. Buy, sell, fund, build, and monetize software businesses globally.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/6 border border-white/[0.08] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="tracking-luxury text-[#A1A1AA] mb-4">{category}</p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA]">
            © {new Date().getFullYear()} Softwarise Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookies' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs text-[#A1A1AA] hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

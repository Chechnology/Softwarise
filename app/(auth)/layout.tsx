import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex flex-col w-[480px] flex-shrink-0 relative overflow-hidden bg-[#0D0D10] border-r border-white/[0.06]">
        {/* Background radial */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/8 to-transparent" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-auto">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow-sm">
              <span className="text-[#0B0B0D] font-bold text-base">S</span>
            </div>
            <span className="font-semibold text-xl text-white tracking-tight">Softwarise</span>
          </Link>

          {/* Hero text */}
          <div className="my-auto">
            <p className="tracking-luxury text-primary mb-6">The Software Economy</p>
            <h2 className="text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              Where software<br />becomes<br />
              <span className="text-gradient-gold">opportunity.</span>
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-10">
              Join thousands of founders, buyers, investors, and developers already building the future of software commerce.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '$48M+', label: 'GMV Transacted' },
                { value: '2,400+', label: 'Active Members' },
                { value: '340+', label: 'Deals Closed' },
                { value: '94+', label: 'Active Investors' },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <p className="text-xl font-bold text-white mb-0.5">{s.value}</p>
                  <p className="text-xs text-[#A1A1AA]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-[#A1A1AA]">
            © {new Date().getFullYear()} Softwarise Technologies Ltd.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-[#0B0B0D] font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-lg text-white">Softwarise</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}

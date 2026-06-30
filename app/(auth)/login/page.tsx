'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back!');
      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    setOauthLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: provider === 'linkedin_oidc' ? { scope: 'openid profile email' } : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'OAuth failed';
      toast.error(message);
      setOauthLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome back</h1>
        <p className="text-[#A1A1AA] text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
            Sign up free
          </Link>
        </p>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => handleOAuth('google')}
          disabled={!!oauthLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] hover:border-white/[0.18] transition-all disabled:opacity-60"
        >
          {oauthLoading === 'google' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          Continue with Google
        </button>

        <button
          onClick={() => handleOAuth('linkedin_oidc')}
          disabled={!!oauthLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] hover:border-white/[0.18] transition-all disabled:opacity-60"
        >
          {oauthLoading === 'linkedin_oidc' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          )}
          Continue with LinkedIn
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-xs text-[#A1A1AA] font-medium">or continue with email</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input pl-10"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 accent-primary" />
            <span className="text-xs text-[#A1A1AA]">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Sign In <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="mt-6 text-xs text-center text-[#A1A1AA]">
        By signing in, you agree to our{' '}
        <Link href="/terms" className="text-primary/80 hover:text-primary transition-colors">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-primary/80 hover:text-primary transition-colors">Privacy Policy</Link>
      </p>
    </motion.div>
  );
}

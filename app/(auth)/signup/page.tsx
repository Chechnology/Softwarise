'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShoppingBag, TrendingUp, Wrench, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

const ROLES = [
  { value: 'buyer' as UserRole, label: 'Buyer', icon: ShoppingBag, description: 'Acquire software assets' },
  { value: 'seller' as UserRole, label: 'Seller', icon: Zap, description: 'List & sell software' },
  { value: 'founder' as UserRole, label: 'Founder', icon: TrendingUp, description: 'Raise investment capital' },
  { value: 'investor' as UserRole, label: 'Investor', icon: TrendingUp, description: 'Deploy capital in startups' },
  { value: 'client' as UserRole, label: 'Client', icon: Wrench, description: 'Commission software builds' },
  { value: 'agency' as UserRole, label: 'Agency / Freelancer', icon: Wrench, description: 'Offer development services' },
];

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setStep(2);
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role: selectedRole },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      if (data.user) {
        toast.success('Account created! Check your email to verify.');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed';
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
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error('OAuth failed. Please try again.');
      setOauthLoading(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
          {step === 1 ? 'Create your account' : 'What best describes you?'}
        </h1>
        <p className="text-[#A1A1AA] text-sm">
          {step === 1 ? (
            <>Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">Sign in</Link>
            </>
          ) : (
            'Choose your primary role — you can change this later.'
          )}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {/* OAuth */}
            <div className="flex flex-col gap-3 mb-6">
              {(['google', 'linkedin_oidc'] as const).map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleOAuth(provider)}
                  disabled={!!oauthLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] transition-all disabled:opacity-60"
                >
                  {oauthLoading === provider ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    provider === 'google' ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    )
                  )}
                  Continue with {provider === 'google' ? 'Google' : 'LinkedIn'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-xs text-[#A1A1AA]">or with email</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="input pl-10" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="input pl-10" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password (min. 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left ${
                    selectedRole === role.value
                      ? 'border-primary bg-primary/8 shadow-glow-sm'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.06]'
                  }`}
                >
                  <role.icon className={`w-4 h-4 ${selectedRole === role.value ? 'text-primary' : 'text-[#A1A1AA]'}`} />
                  <div>
                    <p className={`text-sm font-semibold ${selectedRole === role.value ? 'text-primary' : 'text-white'}`}>{role.label}</p>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">{role.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] transition-all">
                Back
              </button>
              <button onClick={handleSignup} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-60">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>

            <p className="mt-4 text-xs text-center text-[#A1A1AA]">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-primary/80 hover:text-primary transition-colors">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary/80 hover:text-primary transition-colors">Privacy Policy</Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            toast.success('Password reset link sent. Check your email.');
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Something went wrong';

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Forgot your password?
                </h1>

                <p className="text-[#A1A1AA] text-sm">
                    Enter your email and we&apos;ll send you a reset link.
                </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">

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


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-glow disabled:opacity-60"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        'Send Reset Link'
                    )}
                </button>

            </form>


            <div className="mt-6 text-center">

                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                </Link>

            </div>

        </motion.div>
    );
}
'use client';

import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const router = useRouter();


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {

            const { error } = await supabase.auth.updateUser({
                password,
            });

            if (error) throw error;

            toast.success('Password updated successfully');

            router.push('/login');

        } catch (err) {

            const message =
                err instanceof Error ? err.message : 'Reset failed';

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
                    Create new password
                </h1>

                <p className="text-[#A1A1AA] text-sm">
                    Choose a secure password for your account.
                </p>

            </div>


            <form onSubmit={handleUpdate} className="space-y-4">


                <div className="relative">

                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />

                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="input pl-10"
                    />

                </div>


                <button
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-primary text-[#0B0B0D] font-semibold text-sm hover:bg-primary/90 transition-all"
                >

                    {
                        loading
                            ?
                            <Loader2 className="w-4 h-4 animate-spin" />
                            :
                            'Update Password'
                    }

                </button>


            </form>


        </motion.div>

    );
}
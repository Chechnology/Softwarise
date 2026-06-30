import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Terms of Service
                </h1>

                <p className="text-[#A1A1AA] text-sm">
                    The rules and guidelines for using Softwarise.
                </p>
            </div>

            <div className="space-y-6 text-sm text-[#A1A1AA] leading-relaxed">

                <section>
                    <h2 className="text-white font-semibold mb-2">
                        1. Acceptance of Terms
                    </h2>

                    <p>
                        By creating an account and using Softwarise, you agree to these
                        terms and our platform guidelines.
                    </p>
                </section>


                <section>
                    <h2 className="text-white font-semibold mb-2">
                        2. Using the Platform
                    </h2>

                    <p>
                        Softwarise connects users with software assets, services,
                        opportunities, and technology solutions. Users are responsible for
                        the accuracy of information they provide.
                    </p>
                </section>


                <section>
                    <h2 className="text-white font-semibold mb-2">
                        3. User Accounts
                    </h2>

                    <p>
                        You are responsible for keeping your account information secure and
                        maintaining control of your account.
                    </p>
                </section>


                <section>
                    <h2 className="text-white font-semibold mb-2">
                        4. Changes
                    </h2>

                    <p>
                        We may update these terms as Softwarise evolves.
                    </p>
                </section>

            </div>


            <div className="mt-8 text-center">

                <Link
                    href="/signup"
                    className="text-primary hover:text-primary/80 text-sm transition-colors"
                >
                    Back to signup
                </Link>

            </div>

        </motion.div>
    );
}
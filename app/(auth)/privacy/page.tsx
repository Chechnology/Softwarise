import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Privacy Policy
                </h1>

                <p className="text-[#A1A1AA] text-sm">
                    How Softwarise collects, uses, and protects your information.
                </p>

            </div>


            <div className="space-y-6 text-sm text-[#A1A1AA] leading-relaxed">


                <section>

                    <h2 className="text-white font-semibold mb-2">
                        1. Information We Collect
                    </h2>

                    <p>
                        We collect information you provide when creating an account,
                        using our services, and interacting with the platform.
                    </p>

                </section>


                <section>

                    <h2 className="text-white font-semibold mb-2">
                        2. How We Use Information
                    </h2>

                    <p>
                        Your information helps us provide better experiences, improve
                        services, personalize features, and maintain platform security.
                    </p>

                </section>


                <section>

                    <h2 className="text-white font-semibold mb-2">
                        3. Data Protection
                    </h2>

                    <p>
                        We take reasonable measures to protect your information and keep
                        your account secure.
                    </p>

                </section>


                <section>

                    <h2 className="text-white font-semibold mb-2">
                        4. Contact
                    </h2>

                    <p>
                        If you have questions about privacy, please contact the Softwarise
                        team.
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
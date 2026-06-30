import { MainNav } from '@/components/layout/MainNav';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0D]">
      <MainNav user={user} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

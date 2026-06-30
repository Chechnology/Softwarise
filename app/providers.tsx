'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PostHogProvider = dynamic(
  () => import('./posthog-provider').then((mod) => mod.PostHogProvider),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        {children}
      </PostHogProvider>
    </QueryClientProvider>
  );
}

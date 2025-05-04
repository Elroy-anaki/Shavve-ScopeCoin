'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpcClientComp } from '@/server/trpc.Provider';
import { httpBatchLink } from '@trpc/client';
import { ReactNode, useState } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcClientComp.createClient({
      links: [httpBatchLink({ url: '/api/trpc' })],
    })
  );

  return (
    <trpcClientComp.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpcClientComp.Provider>
  );
}

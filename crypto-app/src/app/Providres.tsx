'use client';

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpcClientComp } from '@/server/trpc.Provider';
import { httpBatchLink } from '@trpc/client';
import { ReactNode, useState } from 'react';
import AuthProvider from "@/providers/AuthProvider"
import CryptoProvider from '@/providers/CryptoProvider';
import CurrenciesProvider from '@/providers/CurrenciesProvider';


export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcClientComp.createClient({
      links: [httpBatchLink({ url: '/api/trpc' })],
    })
  );

  return (
    <SessionProvider>
      <trpcClientComp.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <CurrenciesProvider>
            <CryptoProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </CryptoProvider>
          </CurrenciesProvider>
        </QueryClientProvider>
      </trpcClientComp.Provider>
    </SessionProvider>
  );
}

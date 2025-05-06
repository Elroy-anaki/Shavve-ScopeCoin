import { createTRPCReact } from '@trpc/react-query';
import {AppRouter} from "@/server/index"
import { createTRPCClient } from '@trpc/client';
import { httpLink } from '@trpc/client';
import { envVars } from '@/config/envVars/envVars.config';

// for client components
export const trpcClientComp = createTRPCReact<AppRouter>();


// for server components
export const trpcServerComp = createTRPCClient<AppRouter>({ 
  links: [
    httpLink({
      url: `${envVars.BASE_URL}/api/trpc`,
    }),
  ],
});
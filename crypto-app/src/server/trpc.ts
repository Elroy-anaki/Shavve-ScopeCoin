import { initTRPC } from '@trpc/server'

export const trcp = initTRPC.create();

export const router = trcp.router;
export const publicProcedure = trcp.procedure;
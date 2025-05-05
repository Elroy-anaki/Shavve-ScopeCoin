import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getSession } from 'next-auth/react';
import { cookies } from "next/headers";


export const createContext = async () => {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  console.log("middlware", ctx)
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

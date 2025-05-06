import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth";
import { initTRPC, TRPCError } from "@trpc/server";



// Create the context per request (doesn't work please help me!!!!!)
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

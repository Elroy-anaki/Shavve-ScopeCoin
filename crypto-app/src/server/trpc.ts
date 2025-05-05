import { initTRPC, TRPCError } from '@trpc/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

// Define the context type explicitly
export interface Context {
  session: any; // session type here is fine for simplicity
}

// Create the context for each request
export const createContext = async ({ req, res }: { req: any; res: any }): Promise<any> => {
  const session = req && res && (await getServerSession(req, res, authOptions));

  // Add logs to debug session state
  console.log("Session in createContext:", session);

  return {
    session,
    req, 
    res,
    
    
  };
};

// Initialize tRPC with the correct context
const t = initTRPC.context<Context>().create();

// Export the router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

// Auth middleware for protected routes
const isAuthed = middleware(({ ctx, next }) => {
  console.log("ctx in isAuthed middleware", ctx); 
  // This should now contain the session

  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

// Protected procedure that requires authentication
export const protectedProcedure = publicProcedure.use(isAuthed);

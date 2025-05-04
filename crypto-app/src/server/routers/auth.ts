import { signUpSchema } from '@/validation/auth/signUp.schema';
import { publicProcedure, router } from '../trpc';
import { signUp } from '@/db/api/auth/requests';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const newUser = await signUp(input);
      return newUser;
    }),
});
import { signUpSchema } from '@/validation/auth/signUpSchema';
import { publicProcedure, router } from '../trpcConfig';
import { signUp } from '@/config/db/api/auth/requests';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const newUser = await signUp(input);
      return newUser;
    }),
});
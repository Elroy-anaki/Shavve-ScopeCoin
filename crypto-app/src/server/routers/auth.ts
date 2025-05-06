import { signUpSchema } from '@/validation/auth/signUpSchema';
import { publicProcedure, router } from '../trpcConfig';
import { getUserByEmail, getUserByVerifyAccountId, signUp, verifyAccount } from '@/config/db/api/auth/requests';
import { verifyAccountSchema } from '@/validation/auth/verifyAccountSchema';
import { z } from 'zod';
import { sendVerfiyAccountEmail } from '@/utils/auth/emailsUtils';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      try {
        const newUser = await signUp(input);
      return newUser;
      } catch (error) {
        throw error
      }
      
    }),
    sendVerfiyAccountEmail: publicProcedure.input(verifyAccountSchema).mutation(async({input}) => {
      try {
        const user = await getUserByEmail(input.userEmail)
      
      } catch (error) {
        throw error
      }
    }),
    verifyAccount: publicProcedure.input(z.object({id: z.string()})).mutation(async({input}) => {
      try {
       await verifyAccount(input.id)
       
      } catch (error) {
        throw error
      }
    })
});
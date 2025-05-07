import { signUpSchema } from '@/validation/auth/signUpSchema';
import { publicProcedure, router } from '../trpcConfig';
import { resetPassword, signUp, verifyAccount } from '@/requests/db/auth/requests';
import { z } from 'zod';
import { sendResetPasswordMail } from '@/requests/db/auth/requests';
import { resetPasswordSchema } from '@/validation/auth/resetPasswordSchema';
import { handleError } from '../errorHandling'; 

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      return handleError(async () => {
        const newUser = await signUp(input); 
        return newUser;
      });
    }),

  verifyAccount: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return handleError(async () => {
        await verifyAccount(input.id);  
      });
    }),

  sendResetPasswordEmail: publicProcedure
    .input(z.object({ userEmail: z.string() }))
    .mutation(async ({ input }) => {
      return handleError(async () => {
        await sendResetPasswordMail(input.userEmail);  
      });
    }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      return handleError(async () => {
        await resetPassword(input.resetPasswordId, input.userPassword);  
      });
    }),
});

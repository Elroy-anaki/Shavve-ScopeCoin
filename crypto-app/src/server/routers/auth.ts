import { signUpSchema } from '@/validation/auth/signUpSchema';
import { publicProcedure, router } from '../trpcConfig';
import {  resetPassword, signUp, verifyAccount } from '@/config/db/api/auth/requests';
import { z } from 'zod';
import { sendResetPasswordMail } from '@/config/db/api/auth/requests';
import { resetPasswordSchema } from '@/validation/auth/resetPasswordSchema';


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
    verifyAccount: publicProcedure.input(z.object({id: z.string()})).mutation(async({input}) => {
      try {
       await verifyAccount(input.id)
       
      } catch (error) {
        throw error
      }
    }),
    sendResetPasswordEmail: publicProcedure.input(z.object({userEmail: z.string()})).mutation(async({input}) => {
      try {
        await sendResetPasswordMail(input.userEmail)
      } catch (error) {
        throw error
      }
    }),
    resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async({input}) => {
      try {
        await resetPassword(input.resetPasswordId, input.userPassword)
      } catch (error) {
        throw error
      }
    })
});
import {z} from "zod";

export const resetPasswordSchema = z.object({
    userPassword: z.string().min(6),
    resetPasswordId: z.string()
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
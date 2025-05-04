import {z} from "zod";

export const signInSchema = z.object({
    userEmail: z.string().email(),
    userPassword: z.string().min(6),
})

export type SignInInput = z.infer<typeof signInSchema>;
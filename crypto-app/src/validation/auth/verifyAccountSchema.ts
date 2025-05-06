import {z} from "zod";

export const verifyAccountSchema = z.object({
    userPassword: z.string().min(6),
})

export type VerifyAccountInput = z.infer<typeof verifyAccountSchema>;
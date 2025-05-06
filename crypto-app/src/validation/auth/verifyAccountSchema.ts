import {z} from "zod";

export const verifyAccountSchema = z.object({
    userEmail: z.string().min(6),
})

export type VerifyAccountInput = z.infer<typeof verifyAccountSchema>;
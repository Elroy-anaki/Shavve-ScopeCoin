import { string, z } from "zod";
import { publicProcedure, router } from "../trpc";
import { addCryptoForUser } from "@/requests/db/userCrypto";



export const cryptoRouter = router({
    addCryptoForUser: publicProcedure.input(z.object({ crypto: z.string() })).mutation(async ({ input }) => {
        try {
            await addCryptoForUser(input.crypto)
        } catch (error) {
            throw error
        }
    })
})

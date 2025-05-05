import { string, z } from "zod";
import { publicProcedure, router, protectedProcedure } from "../trpc";
import { addCryptoForUser, deleteFavoriteCryptos, getFavoritesCryptos } from "@/requests/db/userCrypto";



export const cryptoRouter = router({
    addCryptoForUser: publicProcedure.input(z.object({ crypto: z.string() })).mutation(async ({ input }) => {
        try {
            await addCryptoForUser(input.crypto)
        } catch (error) {
            throw error
        }
    }),
    getFavoritesCryptos: publicProcedure.input(z.object({userId: z.number()})).query(async ({input}) => {
        try {
        
          const favoritesCryptos = await getFavoritesCryptos(input.userId);
          return favoritesCryptos;
        } catch (error) {
          throw error;
        }
      }),
      deleteFavoriteCrypto : publicProcedure.input(z.object({ crypto: z.array(z.string()), userId: z.number() })).mutation(async ({ input }) => {
        try {
            await deleteFavoriteCryptos(input.crypto, input.userId)
        } catch (error) {
            throw error
        }
    })
})

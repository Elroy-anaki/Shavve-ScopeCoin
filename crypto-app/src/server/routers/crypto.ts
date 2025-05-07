import { z } from "zod";
import { publicProcedure, router } from "../trpcConfig";
import { addCryptoForUser, deleteFavoriteCryptos, getFavoritesCryptos } from "@/requests/db/userCrypto";
import { convertCrypto } from "@/requests/external/coinMarket";
import { handleError } from '../errorHandling'; 

export const cryptoRouter = router({
    addCryptoForUser: publicProcedure.input(z.object({ crypto: z.string() })).mutation(async ({ input }) => {
        return handleError(async () => {
            await addCryptoForUser(input.crypto);
        });
    }),
    
    getFavoritesCryptos: publicProcedure.input(z.object({ userId: z.number() })).query(async ({ input }) => {
        return handleError(async () => {
            const favoritesCryptos = await getFavoritesCryptos(input.userId);
            return favoritesCryptos;
        });
    }),
    
    deleteFavoriteCrypto: publicProcedure.input(z.object({ crypto: z.array(z.string()), userId: z.number() })).mutation(async ({ input }) => {
        return handleError(async () => {
            await deleteFavoriteCryptos(input.crypto, input.userId);
        });
    }),
    
    convertCrypto: publicProcedure.input(z.object({ base: z.string(), target: z.string(), amount: z.number().positive() })).mutation(async ({ input }) => {
        return handleError(async () => {
            const convertingResult = await convertCrypto(input.base, input.target, input.amount);
            return convertingResult;
        });
    }),
});

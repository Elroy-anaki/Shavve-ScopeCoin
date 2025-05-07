import { convertAmount, getAllCurrencies, getAllSymbols } from "@/requests/external/openExchangeRate";
import { publicProcedure, router } from "../trpcConfig";
import { addUserCurrencySchema } from "@/validation/currencies/userCurrency";
import { addCurrrencyForUser, deleteCurrencySymbolsFromUser, getCurrencySymbolsByUserId } from "@/requests/db/userCurrency";
import { z } from "zod";
import { IConvertionResult } from "@/components/dashborad/currencies/ConvertSection";
import { handleError } from '../errorHandling';  

export const currenciesRouter = router({
    getAllCurrenciesSymbols: publicProcedure.query(async () => {
        return handleError(async () => {
            const symbols = await getAllSymbols();
            return symbols;
        });
    }),
    
    getAllCurrencies: publicProcedure.query(async () => {
        return handleError(async () => {
            const currencies = await getAllCurrencies();
            return currencies;
        });
    }),

    addCurrrencyForUser: publicProcedure.input(addUserCurrencySchema).mutation(async ({ input }) => {
        return handleError(async () => {
            await addCurrrencyForUser(input);
        });
    }),

    getCurrencySymbolsByUserId: publicProcedure.input(z.object({ userId: z.number().int().positive() })).query(async ({ input }) => {
        return handleError(async () => {
            const userId = Number(input.userId);  // should be available now
            const symbols = await getCurrencySymbolsByUserId(userId);
            return symbols;
        });
    }),

    deleteCurrencySymbolsFromUser: publicProcedure.input(z.object({ symbol: z.string(), userId: z.number().int().positive() })).mutation(async ({ input }) => {
        return handleError(async () => {
            await deleteCurrencySymbolsFromUser(input.symbol, input.userId);
        });
    }),

    convertAmount: publicProcedure.input(z.object({ amount: z.number().positive(), base: z.string(), target: z.string() })).mutation(async ({ input }): Promise<IConvertionResult> => {
        return handleError(async () => {
            const result = await convertAmount(input.base, input.target, input.amount);
            return result;
        });
    })
});

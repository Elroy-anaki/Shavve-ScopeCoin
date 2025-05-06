import { convertAmount, getAllCurrencies, getAllSymbols } from "@/requests/external/openExchangeRate";
import { publicProcedure, router } from "../trpcConfig";
import { addUserCurrencySchema } from "@/validation/currencies/userCurrency";
import { addCurrrencyForUser, deleteCurrencySymbolsFromUser, getCurrencySymbolsByUserId } from "@/requests/db/userCurrency";
import { z } from "zod";
import { IConvertionResult } from "@/components/dashborad/currencies/ConvertSection";




export const currenciesRouter = router({
    getAllCurrenciesSymbols: publicProcedure.query(async () => {
        try {
            const symbols = await getAllSymbols()
            return symbols
        } catch (error) {
            throw error
        }
    }),
    getAllCurrencies: publicProcedure.query(async () => {
        try {
            const currencies = await getAllCurrencies()
            return currencies
        } catch (error) {
            throw error
        }
    }),
    addCurrrencyForUser: publicProcedure.input(addUserCurrencySchema).mutation(async ({ input }) => {
        try {
            await addCurrrencyForUser(input)
        } catch (error) {
            throw error
        }
    }),
    getCurrencySymbolsByUserId: publicProcedure.input(z.object({ userId: z.number().int().positive() })).query(async ({ input }) => {
        try {
        console.log(input)
          const userId = Number(input.userId);  // should be available now
          const symbols = await getCurrencySymbolsByUserId(userId);
          return symbols;
        } catch (error) {
          throw error;
        }
      }),
      deleteCurrencySymbolsFromUser : publicProcedure.input(z.object({symbol: z.string(), userId: z.number().int().positive()})).mutation(async({input}) => {
        try {
            await deleteCurrencySymbolsFromUser(input.symbol, input.userId)
        } catch (error) {
            throw error
        }

      }),
      convertAmount : publicProcedure.input(z.object({amount: z.number().positive(), base: z.string(), target: z.string()})).mutation(async({input}): Promise<IConvertionResult> => {
        try {
            const result = await convertAmount(input.base, input.target, input.amount)
            return result
        } catch (error) {
            throw error
        }
      }),
    })

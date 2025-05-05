import { getSymbolByName, fetchStockPriceBySymbol } from '@/requests/external/alphaVantage';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';


export const stockPricesRouter = router({
    fetchStockPriceBySymbol: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
        })
      )
      .query(async ({ input }) => {
        try {
            console.log(input.name)
          const symbol = await getSymbolByName(input.name);
          console.log(symbol)
          const stockPriceData = await fetchStockPriceBySymbol(symbol[0]['1. symbol'])
          return stockPriceData;

        } catch (error) {
            console.log(error)
          throw new Error("Failed to fetch symbol");
        }
      }),
  });
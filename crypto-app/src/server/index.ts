import { router } from "./trpc";
import { authRouter } from "./routers/auth";
import { stockPricesRouter } from "./routers/stockPrices";
import { currenciesRouter } from "./routers/currencies";

export const appRouter = router({
    auth: authRouter,
    stockPrices: stockPricesRouter,
    currencies: currenciesRouter
  });

export type AppRouter = typeof appRouter;
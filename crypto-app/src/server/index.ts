import { router } from "./trpc";
import { authRouter } from "./routers/auth";
import { stockPricesRouter } from "./routers/stockPrices";
import { currenciesRouter } from "./routers/currencies";
import { cryptoRouter } from "./routers/crypto";

export const appRouter = router({
    auth: authRouter,
    stockPrices: stockPricesRouter,
    currencies: currenciesRouter,
    cryptoRouter: cryptoRouter
  });

export type AppRouter = typeof appRouter;
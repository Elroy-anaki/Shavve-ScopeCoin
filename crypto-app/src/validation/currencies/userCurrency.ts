import { z } from "zod";

export const addUserCurrencySchema = z.object({
  currencySymbol: z.string().min(1, "Currency symbol is required"),
});
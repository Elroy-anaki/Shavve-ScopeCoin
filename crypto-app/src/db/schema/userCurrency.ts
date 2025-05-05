import { pgTable, serial, integer, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./user";

export const userCurrency = pgTable("userCurrency", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  currencySymbol: varchar("currencySymbol", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => {
  return {
    userCurrencyUnique: unique().on(table.userId, table.currencySymbol),
  };
});

export type UserCurrency = typeof userCurrency.$inferSelect;
export type NewUserCurrency = typeof userCurrency.$inferInsert;
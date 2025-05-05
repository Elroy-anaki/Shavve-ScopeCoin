import { pgTable, serial, varchar, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { users } from "./user";



export const userCrypto = pgTable("userCrypto", {
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
    cryptoSymbol: varchar("cryptoSymbol", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  }, (table) => {
    return {
      userCryptoUnique: unique().on(table.userId, table.cryptoSymbol)
    };
  });

export type UserCrypto = typeof userCrypto.$inferSelect;
export type NewUserCrypto = typeof userCrypto.$inferInsert;

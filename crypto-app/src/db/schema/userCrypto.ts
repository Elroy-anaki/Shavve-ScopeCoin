import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./user";


export const userCrypto = pgTable("userCrypto", {
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    cryptoSymbol: varchar("currencySymbol", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
})


export type UserCrypto = typeof userCrypto.$inferSelect;
export type NewUserCrypto = typeof userCrypto.$inferInsert;

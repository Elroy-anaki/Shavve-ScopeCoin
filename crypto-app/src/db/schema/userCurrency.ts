import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
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
});

export type UserCurrency = typeof userCurrency.$inferSelect;
export type NewUserCurrency = typeof userCurrency.$inferInsert;
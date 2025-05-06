import { pgTable, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    userName: varchar("userName", { length: 255 }),
    userEmail: varchar("userEmail", { length: 255 }).notNull().unique(),
    userPassword: varchar("userPassword", { length: 255 }).notNull(),
    isVerify: boolean("isVerify").default(false),
    resetPasswordId: varchar("resetPasswordId", { length: 255 }).default(""),
    verifyAccountId: varchar("verifyAccountId", { length: 255 }).default(""),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  });

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
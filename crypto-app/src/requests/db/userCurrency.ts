import { db } from "@/config/db";
import { NewUserCurrency, UserCurrency, userCurrency } from "@/config/db/schema/userCurrency";
import { authOptions } from "@/utils/auth/auth";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const addCurrrencyForUser = async (currency: Omit<NewUserCurrency, "userId">) => {
    try {
        const session = await getServerSession(authOptions);
        const currencyToAdd = { ...currency, userId: Number(session?.user.id) };
        await db.insert(userCurrency).values(currencyToAdd);
    } catch (error) {
        throw error
    }
}

export const getCurrencySymbolsByUserId = async (userId: number): Promise<string[] | []> => {
    try {
        
        const symbolsByUserId = await db
        .select({
            currencySymbol: userCurrency.currencySymbol
        })
        .from(userCurrency)
        .where(eq(userCurrency.userId, userId))
        if(!symbolsByUserId) return [] 
        return symbolsByUserId.map(row => row.currencySymbol);
    } catch (error) {
        throw error
    }
}

export  const deleteCurrencySymbolsFromUser = async (currencySymbol: string, userId: number): Promise<UserCurrency[] | null> => {
    try {
        const deletedCurrency = await db
        .delete(userCurrency)
        .where(
          and(
            eq(userCurrency.userId, userId),
            eq(userCurrency.currencySymbol, currencySymbol) 
          )
        )
        .returning();
        return deletedCurrency
    } catch (error) {
        throw error
    }
}




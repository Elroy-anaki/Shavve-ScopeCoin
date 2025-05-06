import { db } from "@/config/db";
import { userCrypto} from "@/config/db/schema/userCrypto"
import { authOptions } from "@/utils/auth/auth";
import {  and, eq, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const addCryptoForUser = async(crypto: string) => {
    try {
        const session = await getServerSession(authOptions)
        const cryptoToAdd = {cryptoSymbol: crypto, userId: Number(session?.user.id) }
        await db.insert(userCrypto).values(cryptoToAdd);
    } catch (error) {
        throw error
    }

}

export const getFavoritesCryptos = async(userId: number) => {
    try {
        const favoritesCryptos = await db.select({
            crypto: userCrypto.cryptoSymbol
        }).from(userCrypto).where(eq(userCrypto.userId, userId))
        return favoritesCryptos.map(row => row.crypto)
    } catch (error) {
        throw error
    }
}

export const deleteFavoriteCryptos = async (cryptoSymbols: string[], userId: number) => {
    try {
      await db
        .delete(userCrypto)
        .where(
          and(
            eq(userCrypto.userId, userId),
            inArray(userCrypto.cryptoSymbol, cryptoSymbols)
          )
        );
    } catch (error) {
      throw error;
    }
  };
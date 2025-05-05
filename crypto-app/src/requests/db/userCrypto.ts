import { db } from "@/db";
import {UserCrypto, userCrypto, NewUserCrypto} from "@/db/schema/userCrypto"
import { authOptions } from "@/utils/auth";
import { and, eq } from "drizzle-orm";
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
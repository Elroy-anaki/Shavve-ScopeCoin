import { db } from '@/config/db/index'
import { users } from "@/config/db/schema"
import bcrypt from 'bcrypt';
import { envVars } from '@/config/envVars/envVars.config';
import { SignInInput } from '@/validation/auth/signInSchema';
import { SignUpInput } from '@/validation/auth/signUpSchema';
import { eq } from 'drizzle-orm';
import { sendVerfiyAccountEmail } from '@/utils/auth/emailsUtils';
import { v4 as uuidv4 } from 'uuid';

export const signUp = async (data: SignUpInput) => {
    try {
        const hashedPassword = await bcrypt.hash(data.userPassword, envVars.HASH_SALT)
        const verifyAccountId = uuidv4()
        const newUser = await db.insert(users).values({
            userName: data.userName,
            userEmail: data.userEmail,
            userPassword: hashedPassword,
            verifyAccountId: verifyAccountId
        }).returning()
        console.log("after DB");
        await sendVerfiyAccountEmail(newUser[0],verifyAccountId)
        return newUser[0]
    } catch (error) {
        console.log("error", error)
        throw error
    }
}




export const signIn = async (data: SignInInput) => {
    try {
        const currectUser = await db.select().from(users).where(eq(users.userEmail, data.userEmail))
        if (!currectUser) throw new Error("User not found!")

        const isPassCompare = await bcrypt.compare(currectUser[0].userPassword, data.userPassword)
        if (!isPassCompare) throw new Error("Password incorrect!")


    } catch (error) {
        console.log("error", error)
        throw error
    }
}

export const verifyAccount = async (verifyAccountId: string) => {
    try {
        const user = await getUserByVerifyAccountId(verifyAccountId)
        if (!user) throw new Error("User not exist!")
        if(user[0].isVerify) throw new Error("Is alreay verifed!")

        await db.update(users)
            .set({ isVerify: true })
            .where(eq(users.verifyAccountId, verifyAccountId));
    } catch (error) {
        throw error
    }
}

export const getUserByVerifyAccountId = async (verifyAccountId: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.verifyAccountId, verifyAccountId))
        return user
    } catch (error) {
        throw error
    }
}
export const getUserByEmail = async (userEmail: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.userEmail, userEmail))
        return user
    } catch (error) {
        throw error
    }
}
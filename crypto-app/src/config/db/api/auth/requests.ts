import { db } from '@/config/db/index'
import { User, users } from "@/config/db/schema"
import bcrypt from 'bcrypt';
import { envVars } from '@/config/envVars/envVars.config';
import { SignInInput } from '@/validation/auth/signInSchema';
import { SignUpInput } from '@/validation/auth/signUpSchema';
import { eq } from 'drizzle-orm';
import { sendVerfiyAccountEmail } from '@/utils/auth/emailsUtils';
import { v4 as uuidv4 } from 'uuid';
import { sendResetPasswordEmail } from '@/utils/auth/emailsUtils';


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

        await sendVerfiyAccountEmail(newUser[0], verifyAccountId)
        return newUser[0]
    } catch (error) {
        console.log("error", error)
        throw error
    }
}


export const verifyAccount = async (verifyAccountId: string) => {
    try {

        const user = await getUserByField("verifyAccountId", verifyAccountId)
        if (!user) throw new Error("User not exist!")
        if (user.isVerify) throw new Error("He is alreay verifed!")

        await db.update(users)
            .set({ isVerify: true , verifyAccountId: ""})
            .where(eq(users.verifyAccountId, verifyAccountId));
    } catch (error) {
        throw error
    }
}

export const sendResetPasswordMail = async (userEmail: string) => {
    try {
        const user = await getUserByField("userEmail", userEmail)
        if (!user) throw new Error("User not exist!")
        const resetPasswordId = uuidv4()
        await db.update(users)
            .set({ resetPasswordId: resetPasswordId })
            .where(eq(users.userEmail, userEmail));
        await sendResetPasswordEmail(user, resetPasswordId)
    } catch (error) {
        throw error
    }
}

export const resetPassword = async (resetPasswordId: string, newPassword: string) => {
    try {
        const user = getUserByField("resetPasswordId", resetPasswordId)
        if (!user) throw new Error("User not exist!")
        const hashedPassword = await bcrypt.hash(newPassword, envVars.HASH_SALT)
        await db.update(users)
            .set({ userPassword: hashedPassword , resetPasswordId: ""})

            .where(eq(users.resetPasswordId, resetPasswordId));
    } catch (error) {
        throw error
    }
}

// Generic function for get user/s
export async function getUserByField<K extends keyof User>(
    field: K,
    value: typeof users[K]["_"]["data"]

) {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users[field], value))
            .limit(1);

        return user[0] ?? null;
    } catch (error) {
        throw error

    }

}
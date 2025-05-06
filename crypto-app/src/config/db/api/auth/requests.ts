import { db } from '@/config/db/index'
import { users } from "@/config/db/schema"
import bcrypt from 'bcrypt';
import { envVars } from '@/config/envVars/envVars.config';
import { SignInInput } from '@/validation/auth/signInSchema';
import { SignUpInput } from '@/validation/auth/signUpSchema';
import { eq } from 'drizzle-orm';

export const signUp = async (data: SignUpInput) => {
    try {
        const hashedPassword =  await bcrypt.hash(data.userPassword, envVars.HASH_SALT)
        const newUser = await db.insert(users).values({
            userName: data.userName,
            userEmail: data.userEmail,
            userPassword: hashedPassword
        }).returning()
        console.log("after DB");

        return newUser[0]
    } catch (error) {
        console.log("error", error)
        throw error
    }
}

export const signIn = async (data: SignInInput) => {
    try {
        const currectUser = await db.select().from(users).where(eq(users.userEmail, data.userEmail))
        if(!currectUser) throw new Error("User not found!")

        const isPassCompare = await bcrypt.compare(currectUser[0].userPassword, data.userPassword)
        if(!isPassCompare) throw new Error("Password incorrect!")
            

    } catch (error) {
        console.log("error", error)
        throw error
    }
}
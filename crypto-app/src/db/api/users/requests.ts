import { db } from '@/db/index'
import { NewUser } from "@/db/schema/index"
import { users } from "@/db/schema"
import bcrypt from 'bcrypt';
import { envVars } from '@/config/envVars/envVars.config';

export const createUser = async (user: NewUser) => {
    try {
        const hashedPassword =  await bcrypt.hash(user.userPassword, envVars.HASH_SALT)
        const newUser = await db.insert(users).values({
            userName: user.userName,
            userEmail: user.userEmail,
            userPassword: hashedPassword
        }).returning()
        console.log("after DB");

        return newUser[0]
    } catch (error) {
        console.log("error", error)
        throw error
    }
}
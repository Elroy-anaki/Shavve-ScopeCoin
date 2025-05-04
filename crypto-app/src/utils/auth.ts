import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/db/index"
import bcrypt from "bcrypt"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        console.log("HIIIIII NEXTAUTH")
        const user = await db
          .select()
          .from(users)
          .where(eq(users.userEmail, credentials.email))

        if (!user || user.length === 0) {
          return null
        }

        
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user[0].userPassword
        )

        if (!isPasswordValid) {
          return null
        }

        
        return {
          id: user[0].id.toString(),
          email: user[0].userEmail,
          name: user[0].userName,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sigIn", 
    error: "/auth/error"
  },
  session: {
    strategy: "jwt" satisfies SessionStrategy, 
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      console.log("Session callback:", session);
    if (!session) {
      console.log("No session found after sign out");
    }
      return session
    },
  },
}


export default NextAuth(authOptions)
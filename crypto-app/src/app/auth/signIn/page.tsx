import { authOptions, isSession } from "@/utils/auth/nextAuth"
import { redirect } from "next/navigation"
import {SignInPage} from "./SignInPage"

export default async function Page ()  {
const session = await isSession(authOptions)
    if(session) {
        redirect("/")
    }
    return (
        <>
        <SignInPage /></>
    )
}
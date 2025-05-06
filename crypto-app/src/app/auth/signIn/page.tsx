import SignInForm from "@/components/auth/SignInForm"
import LogoutButton from "@/components/auth/LogoutButton"
import { authOptions, isSession } from "@/utils/auth"
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
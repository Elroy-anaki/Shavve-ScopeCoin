import { authOptions, isSession } from "@/utils/auth"
import { redirect } from "next/navigation"
import {SignUpPage} from "./SignUpPage"

export default async function Page ()  {
    const session = await isSession(authOptions)
    if(session) {
        redirect("/")
    }

    return (
        <><SignUpPage />
            </>
    )
}
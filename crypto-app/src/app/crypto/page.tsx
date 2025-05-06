
import { authOptions, isSession } from "@/utils/auth"
import { CryptoPage } from "./CryptoPage"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await isSession(authOptions)
        if(!session) {
            redirect(`/auth/signIn`)

        }
    return (
        <>
        <CryptoPage />
        </>
    )

}
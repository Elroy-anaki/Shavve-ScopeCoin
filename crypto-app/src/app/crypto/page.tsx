
import { authOptions, isSession } from "@/utils/auth"
import { redirect } from "next/navigation"
import CryptoChart from "./CryptoChart"

export default async function Page() {
    const session = await isSession(authOptions)
        if(!session) {
            redirect(`/auth/signIn`)

        }
    return (
        <>
        <div className="bg-gray-900">

        <CryptoChart />
        </div>
        </>
    )

}
'use client'

import { trpcClientComp } from "@/server/trpcProvider"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface IVerifyAccountSection {
    id: string
}

export function VerifyAccountSection({id}: IVerifyAccountSection) {

    const verifyAccountReq = trpcClientComp.auth.verifyAccount.useMutation()
    const router = useRouter()


    return (
        <>
        <div className="text-center space-y-3">
            <h2 className="text-2xl text-white ">Please click the button below for verfiy your account</h2>
            <Button onClick={async() => {
                try {
                    await verifyAccountReq.mutateAsync({id})
                    toast("You are verifed now", {
                        style: {
                          backgroundColor: "#16a34a",
                          color: "#fff"
                  
                        }
                      });
                      router.replace("/auth/signIn")
                } catch (error) {
                    console.log(error)
                }
            }} className="w-3/4 mx-auto bg-purple-600 hover:bg-purple-500">Verify Account</Button>
            </div></>
    )


}
'use client'

import { trpcClientComp } from "@/server/trpcProvider"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { toast } from "sonner"



export function ForgotPasswordSection() {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [warning, setWarning] = useState<string | null>(null)
    const sendResetPasswordEmail = trpcClientComp.auth.sendResetPasswordEmail.useMutation()

    return (
        <>
            <div className="text-center space-y-3">
                <h2 className="text-2xl text-white ">You can reset password here</h2>
                <h3 className="text-2xl text-white ">Enter your email</h3>
                <Input type="email" onChange={async (e) => setUserEmail(e.target.value)} className="text-sm sm:text-base p-2 sm:p-5 bg-white w-3/4 mx-auto"/>
                {warning && <p className="text-sm text-red-500 text-left w-3/4 mx-auto">{warning}</p>}
                <Button onClick={async () => {
                    try {
                        if(!userEmail) {
                            setWarning("Enter your email")
                            return
                        }
                        await sendResetPasswordEmail.mutateAsync({ userEmail })
                        toast("Check your email", {
                            style: {
                              backgroundColor: "#16a34a",
                              color: "#fff"
                      
                            }
                          });
                    } catch (error) {
                        toast("Sending email operation failed!", {
                            style: {
                              backgroundColor: "#DC2626",
                              color: "#fff"
                    
                            }
                          });

                    }
                }} className="w-3/4 mx-auto bg-purple-600 hover:bg-purple-500">Reset</Button>
            </div>
        </>

    )
}
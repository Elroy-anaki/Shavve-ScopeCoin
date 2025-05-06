'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { trpcClientComp } from "@/server/trpcProvider";
import { useRouter } from "next/navigation";

interface IResetPasswordSection {
    resetPasswordId: string
}

export function ResetPasswordSection({resetPasswordId}: IResetPasswordSection){
    const [newUserPassword, setNewUserPassword] = useState<string | null>(null)
    const [warning, setWarning] = useState<string | null>(null)
    const resetPasswordReq = trpcClientComp.auth.resetPassword.useMutation()
    const router = useRouter();

    return (
        <>
            <div className="text-center space-y-3">
                <h2 className="text-2xl text-white ">You can reset your password here</h2>
                <h3 className="text-lg text-white ">Enter your new password</h3>
                <Input type="text" onChange={async (e) => setNewUserPassword(e.target.value)} className="text-sm sm:text-base p-2 sm:p-5 bg-white w-3/4 mx-auto"/>
                {warning && <p className="text-sm text-red-500 text-left w-3/4 mx-auto">{warning}</p>}
                <Button onClick={async () => {
                    try {
                        if(!newUserPassword) {
                            setWarning("Enter your new password")
                            return
                        }
                        await resetPasswordReq.mutateAsync({resetPasswordId, userPassword: newUserPassword})
                        toast("Your new password changed", {
                            style: {
                              backgroundColor: "#16a34a",
                              color: "#fff"
                      
                            }
                          });
                          router.replace(`/auth/signIn`)
                    } catch (error) {
                        console.error(error)
                        toast("Changing password operation failed!", {
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
'use client'

import { Button } from "../ui/button"

interface IVerifyAccountSection {
    id: string
}

export function VerifyAccountSection({id}: IVerifyAccountSection) {


    return (
        <>
        <div className="text-center space-y-3">
            <h2 className="text-2xl text-white ">Please click the button below for verfiy your account</h2>
            <Button onClick={() => alert(id)} className="w-3/4 mx-auto bg-purple-600 hover:bg-purple-500">Verify Account</Button>
            </div></>
    )


}
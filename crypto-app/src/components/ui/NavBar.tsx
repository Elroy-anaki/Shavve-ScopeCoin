'use client'

import Link from "next/link"
import { Button } from "./button"
import { useAuth } from "@/hooks/useAuthStore"
import LogoutButton from "./LogoutButton"
import { useSession } from "next-auth/react"



export const NavBar = () => {
    const session = useSession();
    const auth = useAuth();
    
    return (
        <>

            <ul className=" w-11/12 mx-auto flex justify-between items-center">
            <div className="flex justify-center">
            <li> <Link href={`/auth/signUp`}>
                    <Button className="rounded-r-lg bg-transparent py-6 text-2xl hover:bg-amber-500 ">
                      
                        {session.status === "authenticated" ? session.data.user?.name : `Hi, guest!`}
                    </Button>
                </Link></li>
            </div>
            <div className="flex justify-center gap-4 items-center">
            <li> <Link href={`/auth/signUp`}>
                    <Button className="rounded-r-lg bg-transparent text-xl hover:bg-amber-500">
                        Example 1
                    </Button>
                </Link></li>
                <li> <Link href={`/auth/signUp`}>
                    <Button className="rounded-r-lg bg-transparent text-2xl hover:bg-amber-500">
                    Example 2
                    </Button>
                </Link></li>
                <li> <Link href={`/auth/signUp`}>
                    <Button className="rounded-r-lg bg-transparent text-xl hover:bg-amber-500">
                    Example 3
                    </Button>
                </Link></li>
            </div>
                <div className="flex justify-between items-center">
                {session.status === "authenticated" ? (<li><LogoutButton /></li>) :(<><li>
                    <Link href={`/auth/signIn`}>
                        <Button className="rounded-l-lg bg-transparent hover:bg-amber-500">
                            Sign In
                        </Button>
                    </Link>


                </li>
                <li> <Link href={`/auth/signUp`}>
                    <Button className="rounded-r-lg bg-transparent hover:bg-amber-500">
                        Sign Up
                    </Button>
                </Link></li></>) }
                
                
            </div>
            </ul></>
    )
}
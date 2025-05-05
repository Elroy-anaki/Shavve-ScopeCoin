'use client'

import Link from "next/link"
import { Button } from "./button"
import { useAuth } from "@/hooks/useAuthStore"
import LogoutButton from "./LogoutButton"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { trpcClientComp } from "@/server/trpc.Provider"
 

export const NavBar = () => {
    const session = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (

        <>
            {/* Mobile menu button */}
            <div className="w-11/12 mx-auto md:hidden flex justify-end">
                <button 
                    onClick={toggleMenu}
                    className="text-white p-2"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Main navbar - visible on desktop, conditionally visible on mobile */}
            <ul className={`w-11/12 mx-auto ${isMenuOpen ? 'flex' : 'hidden md:flex'} flex-col md:flex-row justify-between items-center gap-4 md:gap-0`}>
                {/* Logo/Username section */}
                <div className="flex justify-center w-full md:w-auto py-3 md:py-0">
                    <li> 
                        <Link href={`/auth/signUp`}>
                            <Button className="rounded-lg bg-transparent py-4 md:py-6 text-xl md:text-2xl hover:bg-amber-500 w-full">
                                {session.status === "authenticated" ? session.data.user?.name : `Hi, guest!`}
                            </Button>
                        </Link>
                    </li>
                </div>
                
                {/* Navigation links */}
                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center w-full md:w-auto">
                    <li> 
                        <Link href={`/crypto`}>
                            <Button  className="rounded-lg bg-transparent text-lg md:text-xl hover:bg-amber-500 w-full">
                                Stock Prices
                            </Button>
                        </Link>
                    </li>
                    <li> 
                        <Link href={`/currencies`}>
                            <Button className="rounded-lg bg-transparent text-xl md:text-2xl hover:bg-amber-500 w-full">
                            Currencies
                            </Button>
                        </Link>
                    </li>
                    <li> 
                        <Link href={`/auth/signUp`}>
                            <Button className="rounded-lg bg-transparent text-lg md:text-xl hover:bg-amber-500 w-full">
                                Example 3
                            </Button>
                        </Link>
                    </li>
                </div>
                
                {/* Auth buttons */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-auto py-3 md:py-0 gap-2 md:gap-0">
                    {session.status === "authenticated" ? (
                        <li>
                            <LogoutButton />
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href={`/auth/signIn`} className="w-full block">
                                    <Button className="rounded-lg md:rounded-l-lg bg-transparent hover:bg-amber-500 w-full">
                                        Sign In
                                    </Button>
                                </Link>
                            </li>
                            <li> 
                                <Link href={`/auth/signUp`} className="w-full block">
                                    <Button className="rounded-lg md:rounded-r-lg bg-transparent hover:bg-amber-500 w-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </>
    )
}
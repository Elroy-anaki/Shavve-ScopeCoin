'use client'

import Link from "next/link"
import { Button } from "./button"
import { useAuth } from "@/hooks/useAuthStore"
import LogoutButton from "./LogoutButton"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export const NavBar = () => {
    const session = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full">
            {/* Desktop navbar */}
            <div className="hidden md:flex w-11/12 mx-auto justify-between items-center py-4">
                {/* Logo/Username section (left) */}
                <div className="flex items-center gap-2">
                    <Link href={`/`}>
                        <Button className="rounded-lg bg-transparent p-0 hover:bg-transparent">
                            <Image
                                src="/logo.jpg"
                                alt="Logo"
                                width={70}
                                height={50}
                                className="rounded-xl bg-transparent"
                            />                           
                        </Button>
                    </Link>
                    <Link href={`/auth/signUp`}>
                        <Button className="rounded-lg bg-transparent py-4 text-xl hover:bg-purple-700">
                            {session.status === "authenticated" ? session.data.user?.name : `Hi, guest!`}
                        </Button>
                    </Link>
                </div>
                
                {/* Navigation links (center) */}
                <div className="flex items-center gap-4">
                    <Link href={`crypto/allCryptos`}>
                        <Button className="rounded-lg bg-transparent px-5 py-6 font-semibold text-2xl hover:bg-purple-700">
                            Crypto
                        </Button>
                    </Link>
                    <Link href={`/currencies`}>
                        <Button className="rounded-lg bg-transparent px-5 py-6 font-semibold text-2xl hover:bg-purple-700">
                            Currencies
                        </Button>
                    </Link>
                </div>

                {/* Auth buttons (right) */}
                <div className="flex items-center">
                    {session.status === "authenticated" ? (
                        <LogoutButton />
                    ) : (
                        <div className="flex">
                            <Link href={`/auth/signIn`}>
                                <Button className="rounded-l-lg bg-transparent hover:bg-purple-700">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={`/auth/signUp`}>
                                <Button className="rounded-r-lg bg-transparent hover:bg-purple-700">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile navbar */}
            <div className="md:hidden w-11/12 mx-auto">
                {/* Logo/Username in the center and menu button */}
                <div className="flex justify-between items-center py-3">
                    {/* Empty div for spacing */}
                    <div className="w-10"></div>
                    
                    {/* Logo/Username centered */}
                    <div className="flex items-center gap-2 justify-center">
                        <Link href={`/`}>
                            <Button className="rounded-lg bg-transparent p-0 hover:bg-transparent">
                                <Image
                                    src="/logo.jpg"
                                    alt="Logo"
                                    width={70}
                                    height={50}
                                    className="rounded-xl bg-transparent"
                                />                           
                            </Button>
                        </Link>
                        <Link href={`/auth/signUp`}>
                            <Button className="rounded-lg bg-transparent py-2 text-lg hover:bg-purple-700">
                                {session.status === "authenticated" ? session.data.user?.name : `Hi, guest!`}
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile collapsible menu */}
                {isMenuOpen && (
                    <div className="w-full mt-2 pb-4 border-t border-gray-700">
                        <ul className="flex flex-col gap-3 pt-3">
                            <li>
                                <Link href={`crypto/allCryptos`}>
                                    <Button className="rounded-lg bg-transparent px-5 py-3 font-semibold text-lg hover:bg-purple-700 w-full text-left">
                                        Crypto
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/currencies`}>
                                    <Button className="rounded-lg bg-transparent px-5 py-3 font-semibold text-lg hover:bg-purple-700 w-full text-left">
                                        Currencies
                                    </Button>
                                </Link>
                            </li>
                            
                            {/* Auth buttons in mobile menu */}
                            {session.status === "authenticated" ? (
                                <li className="mt-3">
                                    <LogoutButton />
                                </li>
                            ) : (
                                <li className="flex flex-col gap-2 mt-3">
                                    <Link href={`/auth/signIn`} className="w-full">
                                        <Button className="rounded-lg bg-transparent hover:bg-purple-700 w-full">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href={`/auth/signUp`} className="w-full">
                                        <Button className="rounded-lg bg-transparent hover:bg-purple-700 w-full">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
'use client'

import Link from "next/link"
import { Button } from "./button"
import LogoutButton from "../auth/LogoutButton"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export const NavBar = () => {
    const session = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when clicking outside or pressing escape
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            // Check if clicked outside the menu
            const drawer = document.getElementById('mobile-drawer');
            const menuButton = document.getElementById('menu-button');
            
            if (isMenuOpen && drawer && !drawer.contains(event.target as Node) && 
                menuButton && !menuButton.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent scrolling when drawer is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full">
            {/* Desktop navbar */}
            <div className="hidden md:flex w-11/12 mx-auto justify-between items-center py-2">
                {/* Logo/Username section (left) */}
                <div className="flex items-center gap-2">
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
                        <Link href={`/auth/signUp`}>
                            <Button className="rounded-lg bg-transparent py-2 text-lg hover:bg-purple-700">
                                {session.status === "authenticated" ? session.data.user?.name : `Hi, guest!`}
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <button
                        id="menu-button"
                        onClick={toggleMenu}
                        className="text-white p-2 z-50"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile side drawer menu */}
                <div 
                    className={`fixed top-0 right-0 h-full bg-purple-900 shadow-lg z-40 w-64 transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    id="mobile-drawer"
                >
                    {/* Drawer content */}
                    <div className="p-5 h-full flex flex-col">
                        {/* Close button at top right */}
                        <div className="flex justify-end mb-6">
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        {/* Menu items */}
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href={`crypto/allCryptos`} onClick={() => setIsMenuOpen(false)}>
                                    <Button className="rounded-lg bg-transparent px-4 py-3 font-semibold text-lg hover:bg-purple-700 w-full text-left">
                                        Crypto
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/currencies`} onClick={() => setIsMenuOpen(false)}>
                                    <Button className="rounded-lg bg-transparent px-4 py-3 font-semibold text-lg hover:bg-purple-700 w-full text-left">
                                        Currencies
                                    </Button>
                                </Link>
                            </li>
                            
                            {/* Auth buttons in mobile menu */}
                            {session.status === "authenticated" ? (
                                <li className="mt-4">
                                    <LogoutButton />
                                </li>
                            ) : (
                                <li className="flex flex-col gap-3 mt-4">
                                    <Link href={`/auth/signIn`} className="w-full" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="rounded-lg bg-transparent hover:bg-purple-700 w-full">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href={`/auth/signUp`} className="w-full" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="rounded-lg bg-transparent hover:bg-purple-700 w-full">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                
                {/* Semi-transparent overlay to darken the rest of the screen */}
                {isMenuOpen && (
                    <div 
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </div>
        </div>
    )
}
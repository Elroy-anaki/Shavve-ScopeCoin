'use client'

import Link from "next/link"
import { useState } from "react"

export const Footer = () => {
    const [year] = useState(new Date().getFullYear())
    
    return (
        <footer className="w-full bg-gray-900 mt-20 border-t-2 border-purple-200 ">
            <div className="w-11/12 mx-auto py-6 md:py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
                    {/* Brand section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">ScopeCoin</h2>
                        <p className="text-sm text-gray-300 mt-1">Your crypto and currency tracker</p>
                    </div>
                    
                
                </div>
                
                {/* Copyright section */}
                <div className="mt-8 pt-4 border-t border-purple-800 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-sm text-gray-300">© {year} ScopeCoin. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/terms" className="text-xs text-gray-300 hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-xs text-gray-300 hover:text-white transition-colors">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
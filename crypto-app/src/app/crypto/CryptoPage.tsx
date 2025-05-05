'use client'

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CryptosRealTimeTable } from "./buildPage/CryptosRealTimeTable";
import Link from "next/link";

export const CryptoPage = () => { 
    return (
        <>
        <div className="flex flex-col gap-6 p-4">
            <div className="flex justify-center items-center gap-4">
                <Link href={`/crypto/favorites`}>
                <Button 
                    className="w-32"
                >
                    My Favorites
                </Button>
                </Link>
                <Link href={`/crypto/allCryptos`}>
                <Button 
                    className="w-32"
                >
                    All Cryptos
                </Button>
                </Link>
            </div>
        </div>
        </>
    )
}

'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { trpcClientComp } from "@/server/trpc.Provider"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import {AllCurrenciesSymbols} from "./AllCurrencySymbols"
import { CurrencyExchageRates } from "./CurrencyExchageRates"
import { ConvertSection } from "./ConvertSection"


interface ICurrenciesPageProps {
  baseCurrency: string
  symbols?: Record<string, string>
  allCurrenciesData: Record<any, number>[]
}

export const CurrenciesPage = ({ symbols, baseCurrency, allCurrenciesData}: ICurrenciesPageProps) => {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-10">Currency Exchange</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CurrencyExchageRates baseCurrency={baseCurrency} symbols={symbols} allCurrenciesData={allCurrenciesData}/>
          <ConvertSection symbols={symbols} />
        </div>
      </div>
    </div>
  )
}





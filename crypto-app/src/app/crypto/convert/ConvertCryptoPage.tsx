'use client'

import { AllCurrenciesSymbols } from "@/app/currencies/buildPage/AllCurrencySymbols"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trpcClientComp } from "@/server/trpc.Provider"
import cryptoStore from "@/stores/cryptoStore"
import currenciesStore from "@/stores/currenciesStore"
import { useState } from "react"
import { toast } from "sonner"
import { SelectCrypto } from "../SelectCrypto"

export const ConvertCryptoPage = () => {
    const [amount, setAmount] = useState<number>(1)
    const [base, setBase] = useState<string>("")
    const [target, setTarget] = useState<string>("")
    const [conversionType, setConversionType] = useState<"crypto-to-fiat" | "fiat-to-crypto">("crypto-to-fiat")
    const [convertionResult, setConvertionResult] = useState<any>(null);
    const convertReq = trpcClientComp.cryptos.convertCrypto.useMutation()

    const currencies = currenciesStore((state) => state)
    const crypto = cryptoStore((state) => state)

    const handleConvert = async () => {
        if (!target || !base) {
            toast("Please choose both base and target currencies")
            return;
        }
        try {
            const result = await convertReq.mutateAsync({ base, target, amount })
            setConvertionResult(result)
        } catch (error) {
            console.log(error)
            toast("Can't convert for these currencies")
        }
    }

    return (
        <div className="p-6 space-y-8">
            {/* Conversion type selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <p className="text-purple-300 font-medium">Conversion Type:</p>
                <select
                    className="bg-gray-800 text-white p-2 rounded-lg border border-purple-600/30 w-full sm:w-auto
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-300"
                    value={conversionType}
                    onChange={(e) => {
                        setConversionType(e.target.value as "crypto-to-fiat" | "fiat-to-crypto")
                        setBase("")
                        setTarget("")
                        setConvertionResult(null)
                    }}
                >
                    <option value="crypto-to-fiat">Crypto ➜ Fiat</option>
                    <option value="fiat-to-crypto">Fiat ➜ Crypto</option>
                </select>
            </div>

            {/* Amount input */}
            <div className="space-y-2">
                <label className="text-purple-300 text-sm font-medium block">Amount</label>
                <Input 
                    type="number" 
                    value={amount}
                    onChange={(e) => {
                        setAmount(Number(e.target.value));
                        setConvertionResult(null)
                    }} 
                    className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500
                    placeholder-gray-400 rounded-lg shadow-sm"
                    min="0.00000001"
                    step="0.00000001"
                    placeholder="Enter amount to convert"
                />
            </div>

            {/* Currency selection */}
            <div className="space-y-5">
                {/* Base currency */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p className="text-purple-300 font-medium w-20">From:</p>
                    <div className="w-full">
                        {conversionType === "crypto-to-fiat" ? (
                            <SelectCrypto 
                                data={crypto.cryptoData} 
                                fn={setBase} 
                                valueInsert="id"
                            />
                        ) : (
                            <AllCurrenciesSymbols 
                                symbols={currencies.currenciesData} 
                                fn={setBase}
                                className="bg-gray-800 border-gray-700 focus:ring-purple-500 w-full" 
                            />
                        )}
                    </div>
                </div>

                {/* Target currency */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p className="text-purple-300 font-medium w-20">To:</p>
                    <div className="w-full">
                        {conversionType === "crypto-to-fiat" ? (
                            <AllCurrenciesSymbols 
                                symbols={currencies.currenciesData} 
                                fn={setTarget}
                                className="bg-gray-800 border-gray-700 focus:ring-purple-500 w-full" 
                            />
                        ) : (
                            <SelectCrypto 
                                data={crypto.cryptoData} 
                                fn={setTarget} 
                                valueInsert="symbol"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Convert Button */}
            <Button 
                onClick={handleConvert}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 rounded-lg
                shadow-lg hover:shadow-purple-500/30 transition duration-300 mt-6
                border border-purple-500/30"
                disabled={!base || !target || convertReq.isPending}
            >
                {convertReq.isPending ? 'Converting...' : 'Convert'}
            </Button>

            {/* Result display */}
            {convertionResult !== null && (
                <div className="mt-6 p-5 bg-gray-800 rounded-lg border border-purple-500/20 shadow-lg text-center">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-400">Conversion Result:</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-purple-300">
                                {Number(convertionResult?.quote?.[`${target}`].price).toFixed(3)}
                            </p>
                            <span className="text-gray-400">{target}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            1 {base} = {Number(convertionResult?.quote?.[`${target}`].price / amount).toFixed(8)} {target}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
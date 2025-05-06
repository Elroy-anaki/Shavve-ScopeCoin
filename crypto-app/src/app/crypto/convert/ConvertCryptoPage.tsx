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
    const [convertionResult, setConvertionResult] = useState<any>(null);
    const convertReq = trpcClientComp.cryptos.convertCrypto.useMutation()

    const currencies = currenciesStore((state) => state)
    const crypto = cryptoStore((state) => state)

    const handleConvert = async () => {
        if (!target || !base) toast("choose curreny")
        console.log(target, base, amount)
        try {
            const result = await convertReq.mutateAsync({ base, target, amount })
            console.log(result.quote)
            setConvertionResult(result)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <div className="p-6 space-y-10">
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Amount</label>
            <Input 
            defaultValue={1}
              type="number" 
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setConvertionResult(null)
            }} 
              className="bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
      
          <div className="flex flex-col gap-5 justify-between items-center">
          <div className="flex justify-between items-center gap-3">
              <p className="text-white font-medium">Base</p>
              <SelectCrypto data={crypto.cryptoData} fn={setBase} />
            </div>
          <div className="flex justify-between items-center gap-5">
              <p className="text-white font-medium">Target</p>
              <AllCurrenciesSymbols symbols={currencies.currenciesData} fn={setTarget} />
            </div>
  
            
          </div>
          
  
          <Button 
            onClick={handleConvert}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Convert
          </Button>
  
          {convertionResult !== null && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <p className="text-purple-300 text-lg">
                {Number(convertionResult?.quote?.[`${target}`].price).toFixed(3)}
              </p>
            </div>
          )}
        </div>
            
        </>
    )
}
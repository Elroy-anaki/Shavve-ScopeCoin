import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AllCurrenciesSymbols } from "./AllCurrencySymbols"
import { toast } from "sonner"
import { trpcClientComp } from "@/server/trpc.Provider"

export interface IConvertionResult {
    conversion_rate: number,
    conversion_result: number 
}

export function ConvertSection({ symbols }: any) {
    const [amount, setAmount] = useState<number>(1)
    const [base, setBase] = useState<string>("")
    const [target, setTarget] = useState<string>("")
    const [convertionResult, setConvertionResult] = useState<IConvertionResult | null>(null);
    const convertReq = trpcClientComp.currencies.convertAmount.useMutation()
  
    const handleConvert = async () => {
        if(!target || !base) toast("choose curreny")
            console.log(target, base, amount)
        try {
            const result = await convertReq.mutateAsync({amount, base, target})
            setConvertionResult(result)
        } catch (error) {
            console.log(error)
        }
      
    }
  
    return (
      <div className="bg-gray-800 rounded-xl border border-purple-500/30 shadow-lg overflow-hidden">
        <div className="bg-purple-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">Convert Currency</h2>
        </div>
        
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
          <div className="flex justify-between items-center gap-5">
              <p className="text-white font-medium">Base</p>
              <AllCurrenciesSymbols symbols={symbols} fn={setBase} />
            </div>
  
            <div className="flex justify-between items-center gap-3">
              <p className="text-white font-medium">Target</p>
              <AllCurrenciesSymbols symbols={symbols} fn={setTarget} />
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
                USD = <span className="text-2xl font-bold text-white">{convertionResult.conversion_rate.toFixed(2)} {target}</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">Exchange Rate: 1 USD = {convertionResult.conversion_result} {target}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
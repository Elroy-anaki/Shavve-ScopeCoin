import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AllCurrenciesSymbols } from "../../../components/dashborad/currencies/AllCurrencySymbols"
import { toast } from "sonner"
import { trpcClientComp } from "@/server/trpcProvider"

export interface IConvertionResult {
    conversion_rate: number,
    conversion_result: number 
}

export function ConvertSection({ symbols }: any) {
  const [amount, setAmount] = useState<number>(1);
  const [base, setBase] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [convertionResult, setConvertionResult] = useState<IConvertionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const convertReq = trpcClientComp.currencies.convertAmount.useMutation();

  const handleConvert = async () => {
    if (!target || !base) {
      toast.error("Please select both currencies");
      return;
    }
    
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await convertReq.mutateAsync({ amount, base, target });
      setConvertionResult(result);
    } catch (error) {
      console.log(error);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden transition-all hover:shadow-purple-500/10 h-full">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-5">
        <h2 className="text-2xl font-bold text-white text-center">Convert Currency</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-2">
          <label className="text-white text-sm font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Amount
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              setConvertionResult(null);
            }}
            className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-3 rounded-lg text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              From Currency
            </label>
            <div className="w-full">
              <AllCurrenciesSymbols symbols={symbols} fn={setBase} />
              {base && <p className="text-xs text-gray-400 mt-1 px-2">{symbols[base]}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              To Currency
            </label>
            <div className="w-full">
              <AllCurrenciesSymbols symbols={symbols} fn={setTarget} />
              {target && <p className="text-xs text-gray-400 mt-1 px-2">{symbols[target]}</p>}
            </div>
          </div>
        </div>

        <Button
          onClick={handleConvert}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Convert Now
            </>
          )}
        </Button>

        {convertionResult !== null && (
          <div className="mt-8 p-6 bg-gray-700/70 rounded-xl border border-purple-500/20 animate-fadeIn transition-all">
            <div className="flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-gray-300 text-sm">
                  {amount} {base} =
                </p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {convertionResult.conversion_result.toFixed(2)} <span className="text-purple-400">{target}</span>
                </h3>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-4"></div>
              
              <p className="text-gray-400 text-sm mt-2 text-center">
                Exchange Rate: 1 {base} = {convertionResult.conversion_rate.toFixed(4)} {target}
              </p>
              
              <p className="text-gray-500 text-xs mt-4 text-center">
                Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  
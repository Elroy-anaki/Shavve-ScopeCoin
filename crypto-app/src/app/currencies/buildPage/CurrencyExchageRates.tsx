import { Button } from "@/components/ui/button";
import { trpcClientComp } from "@/server/trpc.Provider";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { AllCurrenciesSymbols } from "./AllCurrencySymbols";

export function CurrencyExchageRates({
    baseCurrency,
    symbols,
    allCurrenciesData
  }: {
    baseCurrency: string;
    symbols: any,
    allCurrenciesData: any
  }) {
  
    // Utils hooks
    const session = useSession()
    const utils = trpcClientComp.useUtils();
  
    // States for UI
    const [addCurrenyOpen, setAddCurrenyOpen] = useState<boolean>(false)
    const [currencyToAdd, setCurrencyToAdd] = useState<string>("")
  
    // tRPC requests
    const addCurrencyForUser = trpcClientComp.currencies.addCurrrencyForUser.useMutation();
    const deleteCurrencyFromUser = trpcClientComp.currencies.deleteCurrencySymbolsFromUser.useMutation()
    const { data: userCurrencies, refetch } = trpcClientComp.currencies.getCurrencySymbolsByUserId.useQuery({
      userId: Number(session.data?.user.id)
    });
    
    // For converting to this format USD => userCurrency
    const currenciesArray = userCurrencies?.map((code => ({ [code]: Number(allCurrenciesData?.rates[code])})));
    
    // UI requests
    const addCurrency = async() => {
      try {
        
        await addCurrencyForUser.mutateAsync({currencySymbol: currencyToAdd})
        refetch()
        toast(`${currencyToAdd} added succcesfully`)
      } catch (error) {
        toast.error(`Adding ${currencyToAdd} failed!`)
        
      }
      
    }
    const deleteCurrency = async(currencySymbol: string) => {
      try {
        await deleteCurrencyFromUser.mutateAsync({userId: Number(session.data?.user.id), symbol:currencySymbol})
        toast(`${currencySymbol} removed succcesfully`)
        refetch()
      } catch (error) {
        toast.error(`Deleting ${currencySymbol} failed!`)
  
      }
    }
  
    return (
      <div className="bg-gray-800 rounded-xl border border-purple-500/30 shadow-lg overflow-hidden">
        <div className="bg-purple-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">Exchange Rates</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-purple-300 text-center mb-2">Base Currency: <span className="font-bold text-white">{baseCurrency}</span></p>
          </div>
          
          <div className="space-y-3 mb-6">
            {currenciesArray?.map((currency, index) => {
              const [symbol, rate] = Object.entries(currency)[0];
              const currencyName = symbols && symbols[symbol] ? symbols[symbol] : symbol;
              
              return (
                <div
                  key={index}
                  className="bg-gray-700 px-4 py-3 rounded-md shadow flex justify-between items-center hover:bg-gray-650 transition duration-200"
                >
                  <div>
                    <p className="text-white font-medium">
                      {symbol}
                    </p>
                    <p className="text-gray-400 text-xs">{currencyName}</p>
                  </div>
                  <p className="text-red-400 cursor-pointer" onClick={async() => await deleteCurrency(symbol)}>X</p>
                  <p className="text-xl font-bold text-purple-300">{rate.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
          
          <Button 
            onClick={() => setAddCurrenyOpen(!addCurrenyOpen)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            {addCurrenyOpen ? "Cancel" : "Add Currency"}
          </Button>
          
          {addCurrenyOpen && (
            <div className="mt-4 w-full flex justify-between itmes-center gap-5">
              <AllCurrenciesSymbols symbols={symbols} fn={setCurrencyToAdd} />
              <Button onClick={addCurrency} className="w-1/2">Add</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
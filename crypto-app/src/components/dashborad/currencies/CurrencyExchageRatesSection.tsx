import { Button } from "@/components/ui/button";
import { trpcClientComp } from "@/server/trpcProvider";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { AllCurrenciesSymbols } from "./AllCurrencySymbols";

export function CurrencyExchageRatesSection({
  baseCurrency,
  symbols,
  allCurrenciesData
}: {
  baseCurrency: string;
  symbols: any;
  allCurrenciesData: any;
}) {
  // Utils hooks
  const session = useSession();

  // States for UI
  const [addCurrenyOpen, setAddCurrenyOpen] = useState<boolean>(false);
  const [currencyToAdd, setCurrencyToAdd] = useState<string>("");

  // tRPC requests
  const addCurrencyForUser = trpcClientComp.currencies.addCurrrencyForUser.useMutation();
  const deleteCurrencyFromUser = trpcClientComp.currencies.deleteCurrencySymbolsFromUser.useMutation();
  const { data: userCurrencies, refetch } = trpcClientComp.currencies.getCurrencySymbolsByUserId.useQuery({
    userId: Number(session.data?.user.id)
  }) as { data: string[] | undefined, refetch: () => void };

  // For converting to this format USD => userCurrency
  const currenciesArray = userCurrencies?.map((code) => ({ [code]: Number(allCurrenciesData?.rates[code]) }));

  // UI requests
  const addCurrency = async () => {
    if (!currencyToAdd) {
      toast("Please select a currency to add", {
        style: {
          backgroundColor: "#F59E0B", 
          color: "#fff"
          
        }
      });
      return;
    }
    if (userCurrencies && Array.isArray(userCurrencies) && userCurrencies.includes(currencyToAdd)) {
      toast(`${currencyToAdd} is already in your list`, {
        style: {
          backgroundColor: "#F59E0B", 
          color: "#fff"
          
        }
      });
      return;
    }
    
    try {
      await addCurrencyForUser.mutateAsync({ currencySymbol: currencyToAdd });
      refetch();
      
      toast(`${currencyToAdd} added successfully`, {
        style: {
          backgroundColor: "#16A34A", 
          color: "#fff"
          
        }
      });
      setAddCurrenyOpen(false);
      setCurrencyToAdd("");
    } catch (error) {
      toast(`Adding ${currencyToAdd} failed!`, {
        style: {
          backgroundColor: "#DC2626", 
          color: "#fff"
          
        }
      });
    }
  };
  
  const deleteCurrency = async (currencySymbol: string) => {
    try {
      await deleteCurrencyFromUser.mutateAsync({
        userId: Number(session.data?.user.id),
        symbol: currencySymbol
      });
      toast(`${currencyToAdd} is already in your list`, {
        style: {
          backgroundColor: "#16A34A", 
          color: "#fff"
          
        }
      });
      refetch();
    } catch (error) {
      toast.error(`Deleting ${currencySymbol} failed!`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden transition-all hover:shadow-purple-500/10 h-full">
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-5">
        <h2 className="text-2xl font-bold text-white text-center">Exchange Rates</h2>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center mb-6 bg-gray-700/50 py-3 px-4 rounded-xl">
          <div className="flex items-center">
            <span className="text-gray-300 mr-2">Base Currency:</span>
            <span className="font-bold text-white text-lg bg-purple-600/20 px-3 py-1 rounded-md">
              {baseCurrency}
            </span>
          </div>
        </div>

        {currenciesArray?.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No currencies added yet</p>
            <p className="text-sm mt-2">Add your first currency below</p>
          </div>
        )}

        <div className="space-y-3 mb-6 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
          {currenciesArray?.map((currency, index) => {
            const [symbol, rate] = Object.entries(currency)[0];
            const currencyName = symbols && symbols[symbol] ? symbols[symbol] : symbol;

            return (
              <div
                key={index}
                className="bg-gray-700/70 px-5 py-2 rounded-xl shadow-md flex justify-between items-center hover:bg-gray-700 transition-all duration-300 border-l-4 border-purple-500 group"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-white font-medium text-lg">{symbol}</p>
                    <span className="mx-2 text-gray-500">•</span>
                    <p className="text-gray-400 text-sm">{currencyName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-white bg-purple-600/20 py-1 px-3 rounded-lg">
                    {rate.toFixed(2)}
                  </p>
                  <Button
                    onClick={async () => await deleteCurrency(symbol)}
                    className="text-gray-400 bg-transparent hover:text-white hover:bg-red-500 transition-colors duration-300 p-1 opacity-70 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                  
                </div>
              </div>
            );
          })}
        </div>

        {addCurrenyOpen ? (
          <div className="mt-6">
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <AllCurrenciesSymbols symbols={symbols} fn={setCurrencyToAdd} />
              </div>
              <Button
                onClick={addCurrency}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 md:w-auto w-full"
              >
                Add
              </Button>
            </div>
            <Button
              onClick={() => setAddCurrenyOpen(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition duration-300 mt-2"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setAddCurrenyOpen(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Currency
          </Button>
        )}
      </div>
    </div>
  );
}

'use client'

import { CurrencyExchageRatesSection } from "../../components/dashborad/currencies/CurrencyExchageRatesSection"
import { ConvertSection } from "@/components/dashborad/currencies/ConvertSection"
import currenciesStore from "@/stores/currenciesStore"


interface ICurrenciesPageProps {
  baseCurrency: string
  allCurrenciesData: Record<any, number>[]
}

export const CurrenciesPage = ({ baseCurrency, allCurrenciesData }: ICurrenciesPageProps) => {
  const currencies = currenciesStore((state) => state);
  
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Currency Exchange
          </span>
        </h1>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Monitor exchange rates and convert between currencies with our easy-to-use tools
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CurrencyExchageRatesSection 
            baseCurrency={baseCurrency} 
            symbols={currencies.currenciesData} 
            allCurrenciesData={allCurrenciesData}
          />
          <ConvertSection symbols={currencies.currenciesData} />
        </div>
      </div>
    </div>
  );
};




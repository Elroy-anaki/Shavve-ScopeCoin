import { trpcServerComp } from "@/server/trpc.Provider";
import { CurrenciesPage } from "./buildPage/CurrenciesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export default async function Page(){

   const session = await getServerSession(authOptions) // must
   const data = await trpcServerComp.currencies.getAllCurrencies.query() // must
   console.log(data)
   const symbols = await trpcServerComp.currencies.getAllCurrenciesSymbols.query() // must
   const baseCurrency = data.base;
   const userCurrencies = await trpcServerComp.currencies.getCurrencySymbolsByUserId.query({userId: Number(session?.user.id)})
   const currenciesArray = userCurrencies.map((code => ({ [code]: Number(data.rates[code]) })));
   


    return (
        <>
        <CurrenciesPage symbols={symbols} baseCurrency={baseCurrency} allCurrenciesData={data}/>
        </>
    )
}
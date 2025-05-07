import { trpcServerComp } from "@/server/trpcProvider";
import { CurrenciesPage } from "./CurrenciesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/nextAuth";
import { redirect } from "next/navigation";

export default async function Page(){

   const session = await getServerSession(authOptions) 
           if(!session) {
            redirect(`/auth/signIn`)
           }

   // Get the updated prices of currencies Fiat
   // when the app init we get only the names and symbols of the currencies not the real-time-price
   // this happens here      
   const data = await trpcServerComp.currencies.getAllCurrencies.query() 
   const baseCurrency = data.base;

    return (
        <>
        <CurrenciesPage  baseCurrency={baseCurrency} allCurrenciesData={data}/>
        </>
    )
}
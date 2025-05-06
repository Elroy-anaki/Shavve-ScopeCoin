import { trpcServerComp } from "@/server/trpc.Provider";
import { CurrenciesPage } from "./buildPage/CurrenciesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page(){

   const session = await getServerSession(authOptions) // must
           if(!session) {
            redirect(`/auth/signIn`)
               
           }
   const data = await trpcServerComp.currencies.getAllCurrencies.query() // must
   const baseCurrency = data.base;


    return (
        <>
        <CurrenciesPage  baseCurrency={baseCurrency} allCurrenciesData={data}/>
        </>
    )
}
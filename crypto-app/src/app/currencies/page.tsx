import { trpcServerComp } from "@/server/trpcProvider";
import { CurrenciesPage } from "./CurrenciesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

export default async function Page(){

   const session = await getServerSession(authOptions) 
           if(!session) {
            redirect(`/auth/signIn`)
           }
   const data = await trpcServerComp.currencies.getAllCurrencies.query() 
   const baseCurrency = data.base;

    return (
        <>
        <CurrenciesPage  baseCurrency={baseCurrency} allCurrenciesData={data}/>
        </>
    )
}
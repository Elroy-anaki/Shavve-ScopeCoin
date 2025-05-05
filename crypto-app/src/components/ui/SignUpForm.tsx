'use client'

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from 'axios'
import {trpcClientComp} from "@/server/trpc.Provider"
import { signUpSchema } from "@/validation/auth/signUp.schema";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";



type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  
  const signUpReq = trpcClientComp.auth.signUp.useMutation()
  const stockQuery = trpcClientComp.stockPrices.fetchStockPriceBySymbol.useQuery(
    { name: "Tesla" },
    { enabled: false }
  );  const router = useRouter();

  const methods = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (user: SignUpData) => {
    try {
      await signUpReq.mutateAsync(user)
      toast("Thanks for your registration. Sign in Please")
      router.replace("/auth/signIn");
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className="max-w-full sm:max-w-md mx-auto p-2 sm:p-4">

      <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center" onClick={async () => {
                                try {
                                    const res = await stockQuery.refetch();
                                    console.log(res.data)
                                    const lastRefreshed = res.data["Meta Data"]["3. Last Refreshed"]
                                    console.log("res", res.data['Time Series (Daily)'][lastRefreshed])
                                    
                                } catch (error) {
                                    alert("error")
                                    console.log(error)
                                    
                                }
                            }}>Sign Up</h1>
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <FormField
            control={methods.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">User Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="user name..." 
                    className="text-sm sm:text-base p-2 sm:p-3" 
                  />
                </FormControl>
                {methods.formState.errors.userName && (
                  <FormMessage className="text-xs sm:text-sm">{methods.formState.errors.userName.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="email..." 
                    className="text-sm sm:text-base p-2 sm:p-3" 
                  />
                </FormControl>
                {methods.formState.errors.userEmail && (
                  <FormMessage className="text-xs sm:text-sm">{methods.formState.errors.userEmail.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">User Password</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="password..." 
                    type="password" 
                    className="text-sm sm:text-base p-2 sm:p-3" 
                  />
                </FormControl>
                {methods.formState.errors.userPassword && (
                  <FormMessage className="text-xs sm:text-sm">{methods.formState.errors.userPassword.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full cursor-pointer py-2 sm:py-3 text-sm sm:text-base mt-2 sm:mt-4"
          >
            Sign Up
          </Button>
        </form>
      </FormProvider>
      
    </div>
  );
}
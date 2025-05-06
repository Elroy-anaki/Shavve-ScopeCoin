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
import {trpcClientComp} from "@/server/trpcProvider"
import { signUpSchema } from "@/validation/auth/signUpSchema";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import  Link  from "next/link";



type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  
  const signUpReq = trpcClientComp.auth.signUp.useMutation()
  
   const router = useRouter();

  const methods = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (user: SignUpData) => {
    try {
      await signUpReq.mutateAsync(user)
      toast("Thanks for your registration. Check your email Please", {
        style: {
          backgroundColor: "#FFD700",
          color: "#000000"
        }
      });
      router.replace("/auth/signIn");
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className="max-w-full sm:max-w-md mx-auto p-2 sm:p-4">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white" >Sign Up Please!</h1>
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <FormField
            control={methods.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-lg">User Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="user name..." 
                    className="text-sm sm:text-base p-2 sm:p-5 bg-white" 
                  />
                </FormControl>
                {methods.formState.errors.userName && (
                  <FormMessage className="text-xs text-left sm:text-sm">{methods.formState.errors.userName.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-lg">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="email..." 
                    className="text-sm sm:text-base p-2 sm:p-5 bg-white" 
                    
                  />
                </FormControl>
                {methods.formState.errors.userEmail && (
                  <FormMessage className="text-xs text-left sm:text-sm">{methods.formState.errors.userEmail.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-lg">User Password</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="password..." 
                    type="password" 
                    className="text-sm sm:text-base p-2 sm:p-5 bg-white" 
                  />
                </FormControl>
                {methods.formState.errors.userPassword && (
                  <FormMessage className="text-xs text-left sm:text-sm">{methods.formState.errors.userPassword.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 py-2 sm:py-5 text-sm sm:text-lg mt-2 sm:mt-4 font-bold"
          >
            Sign Up
          </Button>
        </form>
      </FormProvider>
      <div className="w-full flex justify-center items-center gap-5 pt-6">
        <p className="text-white text-base">Already have account? </p>
        <Link href={`/auth/signIn`}><Button className="bg-transparent text-purple-400 font-bold cursor-pointer hover:text-purple-300">Sign In here</Button></Link>
      </div>
    </div>
  );
}
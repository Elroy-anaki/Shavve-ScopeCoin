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
  const router = useRouter();

  const methods = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (user: SignUpData) => {
    try {
      await signUpReq.mutateAsync(user)
      toast("Thanks for your registaration. Sign in Please")
      router.replace("/auth/signIn");
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">

      <h1 className="text-xl font-bold mb-6 text-center">Sign Up</h1>
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={methods.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="user name..." />
                </FormControl>
                {methods.formState.errors.userName && (
                  <FormMessage>{methods.formState.errors.userName.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email..." />
                </FormControl>
                {methods.formState.errors.userEmail && (
                  <FormMessage>{methods.formState.errors.userEmail.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="password..." type="password" />
                </FormControl>
                {methods.formState.errors.userPassword && (
                  <FormMessage>{methods.formState.errors.userPassword.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">Sign Up</Button>
        </form>
      </FormProvider>
      
    </div>
  );
}

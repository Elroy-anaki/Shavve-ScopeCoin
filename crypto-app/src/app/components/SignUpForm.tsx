'use client'

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // שים לב ש-Shadcn מותקן כראוי
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from 'axios'

import { formSchema } from "@/app/schemas/signUp.schema";
import { useRouter } from 'next/navigation'



type SignUpData = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const router = useRouter()
  const methods = useForm<SignUpData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit =  async( user: SignUpData) => {
    try {
      const{ data } = await axios.post("http://localhost:3000/api/auth/signUp", user)
      console.log(data)
      router.replace("/")
    } catch (error) {
      alert("eroor")
      console.log(error)
      
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-6 text-center">Sign Up</h1>
      
      {/* עוטף את כל הטופס ב-FormProvider */}
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
                <FormLabel>user Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="password..." />
                </FormControl>
                {methods.formState.errors.userEmail && (
                  <FormMessage>{methods.formState.errors.userEmail.message}</FormMessage>
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

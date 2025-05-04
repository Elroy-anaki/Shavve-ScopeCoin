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

import { signIn } from "next-auth/react";
import { signInSchema } from "@/validation/auth/signIn.schema";
import { useRouter } from "next/navigation";

type SignInData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();

  const methods = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (user: SignInData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: user.userEmail,
      password: user.userPassword,
    });
    console.log(res)

    if (res?.error) {
      alert("האימייל או הסיסמה שגויים");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-6 text-center">Sign In</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="password..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">Sign In</Button>
        </form>
      </FormProvider>
    </div>
  );
}

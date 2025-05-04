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
import { toast } from "sonner"
import { signIn } from "next-auth/react";
import { signInSchema } from "@/validation/auth/signIn.schema";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuthStore";

type SignInData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const auth = useAuth()

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
    auth.setIsAuth(true)
    toast.success("Welcome!")

    if (res?.error) {
      alert("האימייל או הסיסמה שגויים");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="px-10 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-amber-500">Sign In</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-500">Email Address</FormLabel>
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
                <FormLabel className="text-amber-500">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="password..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700">Sign In</Button>
        </form>
      </FormProvider>
    </div>
  );
}

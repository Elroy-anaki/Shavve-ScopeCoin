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
    <div className="px-3 sm:px-6 md:px-10 mx-auto w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-amber-500">Sign In</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

          <FormField
            control={methods.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-500 text-sm sm:text-base">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="email..." 
                    className="text-sm sm:text-base p-2 sm:p-3"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-500 text-sm sm:text-base">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    {...field} 
                    placeholder="password..." 
                    className="text-sm sm:text-base p-2 sm:p-3"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 py-2 sm:py-3 text-sm sm:text-base mt-2 sm:mt-4"
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
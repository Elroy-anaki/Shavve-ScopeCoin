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
import { signInSchema } from "@/validation/auth/signInSchema";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuthStore";
import Link from "next/link";

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

    auth.setIsAuth(true)
    console.log(res)
    

    if (res?.error) {
      toast("Access denied", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff"

        }
      });
    } else {
      toast("Welcome back...", {
        style: {
          backgroundColor: "#16a34a",
          color: "#fff"
  
        }
      });
      router.replace("/");
    }
  };

  return (
    <div className="px-3 sm:px-6 md:px-10 mx-auto w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">Sign In Please</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

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
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-lg">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="password..."
                    className="text-sm sm:text-base p-2 sm:p-5 bg-white"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 py-2 sm:py-5 text-sm sm:text-lg mt-2 sm:mt-4 font-bold"
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
      <div className="w-full flex justify-start items-center gap-1 ">
        <p className="text-white text-sm">forgot your password?</p>
        <Link href={`/auth/forgotPassword`}><Button className="bg-transparent text-purple-400 font-bold cursor-pointer hover:text-purple-300">Reset here</Button></Link>
      </div>
      <div className="w-full flex justify-center items-center gap-5 pt-6">
        <p className="text-white text-base">{"Don't have account? "}</p>
        <Link href={`/auth/signUp`}><Button className="bg-transparent text-purple-400 font-bold cursor-pointer hover:text-purple-300">Sign Up here</Button></Link>
      </div>
    </div>
  );
}
// pages/form.tsx
'use client'
// pages/form.tsx
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

import { formSchema } from "@/app/schemas/signUp.schema";



type SignUpData = z.infer<typeof formSchema>;

export default function SignUpForm() {

  // שימוש ב-useForm עם Zod לאימות
  const methods = useForm<SignUpData>({
    resolver: zodResolver(formSchema),
  });

  // פונקציית שליחה
  const onSubmit = (data: SignUpData) => {
    alert(`שם משתמש: ${data.userName}, דואר אלקטרוני: ${data.userEmail}`);
    console.log(data)
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

          <Button type="submit" className="w-full cursor-pointer">Sign Up</Button>
        </form>
      </FormProvider>
    </div>
  );
}

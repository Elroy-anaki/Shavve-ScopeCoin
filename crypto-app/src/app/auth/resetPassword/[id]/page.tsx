import { ResetPasswordSection } from "@/components/auth/ResetPasswordSection";
import { authOptions, isSession } from "@/utils/auth/nextAuth";
import { redirect } from "next/navigation";

// For better secure when the user wants to reset his password
// he got Email with unique resetPassswordId that store and come from the DB
// After that he press on the link and come to unique URL
// I get this unique id and check the id in the DB

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const session = await isSession(authOptions)
        if(session) {
            redirect("/")
        }
      const { id } = await params;
      return (
        <>
        <div className="mt-10 md:mt-20 border-2 border-purple-100 w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto py-3 md:py-5 rounded-2xl px-4">
        <ResetPasswordSection resetPasswordId={id}/>
        </div>
        </>
      )
}
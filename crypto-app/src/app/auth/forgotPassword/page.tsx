import { ForgotPasswordSection } from "@/components/auth/ForgotPasswordSection";
import { authOptions, isSession } from "@/utils/auth/auth";
import { redirect } from "next/navigation";


export default async function Page() {
    const session = await isSession(authOptions);
    if(session) {
        redirect("/")
    }
    return (
        <>
        <div className="mt-20 border-2 border-purple-100 w-1/3 mx-auto py-5 rounded-2xl">
        <ForgotPasswordSection />
        </div>

        </>
    )
    
}
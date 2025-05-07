import { ForgotPasswordSection } from "@/components/auth/ForgotPasswordSection";
import { authOptions, isSession } from "@/utils/auth/nextAuth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await isSession(authOptions);
    if(session) {
        redirect("/")
    }
    return (
        <>
        <div className="mt-10 md:mt-20 border-2 border-purple-100 w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto py-3 md:py-5 rounded-2xl px-4">
            <ForgotPasswordSection />
        </div>
        </>
    )
}
import { VerifyAccountSection } from "@/components/auth/VerifyAccountSection";
import { authOptions, isSession } from "@/utils/auth/nextAuth";
import { redirect } from "next/navigation";


// For better secure after the user register 
// he got Email with unique verifyAccountId that store and come from the DB
// After that he press on the link and come to unique URL
// I get this unique id and check the id in the DB and verifed him as an real user

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const session = await isSession(authOptions)
  if (session) {
    redirect("/")
  }
  const { id } = await params;
  return (
    <>
      <div className="mt-20 border-2 border-purple-100 w-1/3 mx-auto py-5 rounded-2xl">
        <VerifyAccountSection id={id} />
      </div>
    </>
  );
};

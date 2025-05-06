import { VerifyAccountSection } from "@/components/auth/VerifyAccountSection";
import { authOptions, isSession } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

type IVerifyAccountProps = {
  params: { id: string };
};

export default async function Page({ params }: IVerifyAccountProps){

    const session = await isSession(authOptions)
    if(session) {
        redirect("/")
    }


  const { id } = params;

  return (
    <>
    <div className="mt-20 border-2 border-purple-100 w-1/3 mx-auto py-5 rounded-2xl">

    <VerifyAccountSection id={id}/>
    </div>
    </>
  );
};

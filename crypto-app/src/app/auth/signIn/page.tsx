import SignInForm from "@/components//ui/SignInForm"
import LogoutButton from "@/components/ui/LogoutButton"

export default function Page ()  {

    return (
        <>
            <div>
                <h2 className="text-5xl text-black">Welcome Back!</h2>
                <SignInForm />
                <LogoutButton />
            </div></>
    )
}
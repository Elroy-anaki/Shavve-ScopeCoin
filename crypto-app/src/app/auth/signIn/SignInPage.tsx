import SignInForm from "@/components/ui/SignInForm"

export const SignInPage = () => {
    return (

        <>
        <div className="flex flex-col justify-center items-center">
            <div className="rounded-lg border-2 border-amber-500 w-1/3 px-5 py-10 mx-auto bg-gray-700 text-center space-y-4">
            <h2 className="text-amber-500 text-5xl">
            Welcome Back!
            </h2>

            <SignInForm />
            </div>
        </div>
        </>
    )

}
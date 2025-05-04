import SignInForm from "@/components/ui/SignInForm"

export const SignInPage = () => {
    return (
        <>
        <div className="flex flex-col justify-center items-center px-4 py-6 md:py-10">
            <div className="rounded-lg border-2 border-amber-500 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 px-3 sm:px-4 md:px-5 py-6 sm:py-8 md:py-10 mx-auto bg-gray-700 text-center space-y-4">
                <h2 className="text-amber-500 text-3xl sm:text-4xl md:text-5xl font-bold">
                    Welcome Back!
                </h2>
                <SignInForm />
            </div>
        </div>
        </>
    )
}
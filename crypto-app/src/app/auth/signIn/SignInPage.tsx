import SignInForm from "@/components/ui/SignInForm"

export const SignInPage = () => {
    return (
        <>
        <div className="flex flex-col justify-center items-center px-4 py-6 md:py-10 bg-gray-90">
            <div className="rounded-lg border-2 border-purple-700 w-full shadow-xl shadow-purple-400 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 px-3 sm:px-4 md:px-3 py-6 sm:py-8 md:py-10 mx-auto 0 text-center space-y-">
                <h2 className="text-white text-3xl mb-5 sm:text-4xl md:text-5xl font-bold">
                    Welcome Back!
                </h2>
                <SignInForm />
            </div>
        </div>
        </>
    )
}
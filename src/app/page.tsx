import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth, SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">
              Chat with your desire PDF
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Go to chat</Button>}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Aute est dolore duis ex sit duis qui aute ut proident nisi. Aliquip
            magna in enim deserunt velit dolore excepteur ea aliqua culpa. Duis
            elit tempor nulla ad enim deserunt magna amet cillum nulla.
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <SignInButton>
                <Button>
                  Login to get started
                  <LogIn className="w-6 h-6 ml-2" />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

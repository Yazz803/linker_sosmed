import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import SignInWithGoogle from "@/components/SignInWithGoogle"
import { Icons } from "@/components/icons"
import Heading from "@/components/ui/Heading"
import Paragraph from "@/components/ui/Paragraph"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

const LoginPage = (): JSX.Element => {
  const router = useRouter()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) router.push("/")
  }, [currentUser, router])

  return (
    <>
      {!currentUser && (
        <div className="login__page absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
          <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6 rounded-lg bg-white/80 p-12 shadow-lg backdrop-blur-sm dark:bg-black/80 lg:w-1/3">
            <div className="flex flex-col items-center gap-6 text-center">
              {/* <Link href="/">
                <Button variant="ghost">
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back to home
                </Button>
              </Link> */}

              <Heading>Welcome!</Heading>
              <Paragraph>Please sign in using your google account.</Paragraph>
            </div>
            <SignInWithGoogle />
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage

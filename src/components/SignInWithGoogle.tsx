import React, { FC } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { auth } from "@/config/firebase"
import { cn } from "@/lib/utils"
import { useToast } from "@/utils/use-toast"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { serverTimestamp } from "firebase/firestore"

import GetCollection, {
  addDataDoc,
  addDataSubCollection,
  modifyWord,
  randomInt,
} from "../utils/helpers"

const SignInWithGoogle: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { toast } = useToast()
  const router = useRouter()
  const dataUsers = GetCollection("users")
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  const onClickSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = dataUsers.find((doc) => doc.data().uid === res.user.uid)
        router.push("/")
        toast({
          title: "Welcome back",
          description: "You have successfully logged in!",
        })
        let dataUser = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          username: modifyWord(res.user.displayName || "", 5) + randomInt(4),
          bio: "This is your bio",
          createdAt: serverTimestamp(),
        }
        let appSettings = {
          background_color: "#929292",
          background_image: "none",
          button_type: "fill-rounded-lg",
          button_color: "#ffffff",
          button_font_color: "#888888",
          font_family: "DM sans",
          font_color: "#ffffff",
          createdAt: serverTimestamp(),
        }
        if (!user) {
          addDataDoc("users", dataUser).then((res) => {
            addDataSubCollection("users", res.id, "app_settings", appSettings)
          })
        }
      })
      .catch((error) => {
        console.log({ error })
      })
  }
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        variant="default"
        className="w-full max-w-sm"
        onClick={onClickSignIn}
      >
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Sign in with Google
      </Button>
    </div>
  )
}

export default SignInWithGoogle

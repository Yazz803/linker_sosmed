import React from "react"
import { useRouter } from "next/router"
import { auth } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { LogOut } from "lucide-react"

import { useToast } from "../utils/use-toast"
import { Button } from "./ui/button"

export default function LogoutButton() {
  const { toast } = useToast()
  const { currentUser } = useAuth()
  const router = useRouter()
  const out = () => {
    auth.signOut()
    router.push("/login")
    toast({
      type: "foreground",
      title: "Logged out",
      description: "You have successfully logged out!",
    })
  }
  return (
    currentUser && (
      <Button
        className="flex items-center justify-center gap-2 text-red-400 transition-all hover:text-red-600"
        onClick={out}
        variant="outline"
      >
        <LogOut /> Logout
      </Button>
    )
  )
}

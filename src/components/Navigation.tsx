import React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import GetCollection from "@/utils/helpers"
import { AlignJustify, Flower2, Menu, Smartphone } from "lucide-react"

import LogoutButton from "./LogoutButton"
import ThemeSwitch from "./ThemeSwitch"
import { Separator } from "./ui/separator"

const Navigation = (): JSX.Element => {
  const { currentUser } = useAuth()
  const dataUsers = GetCollection("users")
  const foundUser = dataUsers.find(
    (document) => document.data().uid === currentUser?.uid
  )
  const username = foundUser?.data().username
  return (
    <div className="mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between py-6">
        <nav className="flex items-center gap-4">
          <Link
            className="py-4 pr-6 text-gray-900 dark:text-white flex items-center gap-2"
            href="/"
          >
            <AlignJustify /> Links
          </Link>
          <Link
            className="py-4 pr-6 text-gray-900 dark:text-white flex items-center gap-2"
            href={`/u/${username}`}
          >
            <Smartphone /> Apperance
          </Link>
        </nav>
        <nav className="flex items-center space-x-1">
          <LogoutButton />
          <ThemeSwitch />
        </nav>
      </div>
    </div>
  )
}

export default Navigation

import React from "react"
import Link from "next/link"

import LogoutButton from "./LogoutButton"
import ThemeSwitch from "./ThemeSwitch"
import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

const Navigation = (): JSX.Element => {
  return (
    <div className="mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between py-6">
        <nav>
          <Link className="py-4 pr-6 text-gray-900 dark:text-white" href="/">
            Home
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

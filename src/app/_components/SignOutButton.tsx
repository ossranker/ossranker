"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      className="cursor-pointer text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    >
      Sign out
    </button>
  )
}

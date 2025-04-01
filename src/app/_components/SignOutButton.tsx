"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      className="cursor-pointer text-sm text-gray-400 transition-all duration-200 hover:scale-105 hover:text-white"
    >
      Sign out
    </button>
  );
}

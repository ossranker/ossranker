"use client";

import { signIn } from "next-auth/react";

export function TwitterSignIn() {
  return (
    <button
      onClick={() => void signIn("twitter")}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm transition-all hover:border-teal-600 hover:shadow-[0_0_8px_rgba(13,148,136,0.35)] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-teal-500 dark:hover:shadow-[0_0_8px_rgba(20,184,166,0.35)]"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-current"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Sign in with Twitter
    </button>
  );
}

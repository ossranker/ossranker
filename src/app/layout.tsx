import "~/styles/globals.css"

import { StackProvider, StackTheme } from "@stackframe/stack"
import { stackServerApp } from "../stack"
import { type Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "sonner"

import { TRPCReactProvider } from "~/trpc/react"
import { Providers } from "~/app/providers"

export const metadata: Metadata = {
  title: "OSSRanker",
  description: "Accurate, transparent, and data-driven rankings for open-source softwares.",
  icons: [{ rel: "icon", url: "/favicon.svg" }]
}

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.variable}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <Providers>
              <TRPCReactProvider>
                {children}
                <Toaster position="top-right" theme="dark" closeButton richColors />
              </TRPCReactProvider>
            </Providers>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  )
}

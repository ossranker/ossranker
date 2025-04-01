import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { GitHubSignIn } from "~/app/_components/GitHubSignIn";
import { PulsingBackground } from "~/app/_components/PulsingBackground";

export default async function LandingPage() {
  const session = await auth();

  // Redirect to home if already authenticated
  if (session) {
    redirect("/home");
  }

  return (
    <HydrateClient>
      <main className="relative flex min-h-screen flex-col items-center bg-gray-950">
        <PulsingBackground />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-950/50 via-gray-950/70 to-gray-950/90" />

        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-gray-800/40 bg-gray-950/70 backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/images/logos/company-logo.svg"
                alt="Company Name"
                width={140}
                height={38}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
        </nav>

        {/* Add padding to account for fixed navbar */}
        <div className="h-20 w-full" />

        {/* Hero Section */}
        <div className="relative z-10 w-full px-4 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Secure OSS Evaluate, Benchmark, Govern with Confidence
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-gray-400 sm:text-lg md:text-xl">
              Accurate, transparent, and data-driven rankings for open-source
              softwares.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {!session && <GitHubSignIn />}
            </div>
          </div>
        </div>

        {/* Features Section */}
        {!session && (
          <div className="relative z-10 w-full py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature Cards */}
                {[
                  {
                    title: "Feature One",
                    description: "Description of your first main feature.",
                    icon: "⚡️",
                  },
                  {
                    title: "Feature Two",
                    description: "Description of your second main feature.",
                    icon: "🚀",
                  },
                  {
                    title: "Feature Three",
                    description: "Description of your third main feature.",
                    icon: "🛡️",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-800/50"
                  >
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="mb-4 text-2xl">{feature.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 w-full border-t border-gray-800/40 py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} OSSRanker. All rights reserved.
          </div>
        </footer>
      </main>
    </HydrateClient>
  );
}

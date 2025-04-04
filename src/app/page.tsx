import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { GitHubSignIn } from "~/app/_components/GitHubSignIn";
import { TwitterSignIn } from "~/app/_components/TwitterSignIn";
import { ThemeToggle } from "~/app/_components/ThemeToggle";

export default async function LandingPage() {
  const session = await auth();

  // Redirect to home if already authenticated
  if (session) {
    redirect("/home");
  }

  return (
    <HydrateClient>
      <main className="relative flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-950">
        {/* Grid Background */}
        <div className="fixed inset-0 z-0">
          <svg
            className="h-full w-full"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-200/70 dark:text-gray-800/70"
                />
              </pattern>
              <animate
                attributeName="opacity"
                values="0.7;0.3;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)">
              <animate
                attributeName="opacity"
                values="0.7;0.3;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect width="100%" height="100%" fill="url(#grid)">
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200/40 bg-white/80 backdrop-blur-md dark:border-gray-800/40 dark:bg-gray-950/70">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/images/logos/company-logo-dark.svg"
                alt="Company Name"
                width={140}
                height={38}
                className="block h-9 w-auto dark:hidden"
                priority
              />
              <Image
                src="/images/logos/company-logo.svg"
                alt="Company Name"
                width={140}
                height={38}
                className="hidden h-9 w-auto dark:block"
                priority
              />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Add padding to account for fixed navbar */}
        <div className="h-16 w-full" />

        {/* Hero Section */}
        <div className="relative z-10 w-full px-4 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-gradient-shift dark:animate-gradient-shift-dark bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Secure OSS Evaluate, Benchmark, Govern with Confidence
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              Accurate, transparent, and data-driven rankings for open-source
              softwares.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {!session && (
                <>
                  <GitHubSignIn />
                  <TwitterSignIn />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        {!session && (
          <div className="relative z-10 w-full py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature Cards */}
                {[
                  {
                    title: "Vote for Your Favorite OSS",
                    description:
                      "Support open-source projects by voting for your favorites and help them gain recognition.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-600/20 p-3">
                        <Image
                          src="/images/icons/champion-stroke-rounded.svg"
                          alt="Vote"
                          width={24}
                          height={24}
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Win Airdrops",
                    description:
                      "Participate in daily voting to become eligible for exclusive airdrops and rewards from top OSS projects.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400/20 to-purple-600/20 p-3">
                        <Image
                          src="/images/icons/package-stroke-rounded.svg"
                          alt="Airdrop"
                          width={24}
                          height={24}
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Daily Tasks & Rewards",
                    description:
                      "Complete daily voting tasks to earn more rewards and increase your chances of winning bigger prizes.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 p-3">
                        <Image
                          src="/images/icons/task-01-stroke-rounded.svg"
                          alt="Task icon"
                          width={24}
                          height={24}
                        />
                      </div>
                    ),
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 p-8 transition-all duration-300 hover:border-teal-500/30 hover:bg-gray-100/50 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-teal-500/30 dark:hover:bg-gray-800/50"
                  >
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="mb-4 text-2xl">{feature.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 w-full border-t border-gray-200/40 py-8 dark:border-gray-800/40">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} OSSRanker. All rights reserved.
          </div>
        </footer>
      </main>
    </HydrateClient>
  );
}

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

          {/* Web3 decorative elements */}
          <div className="fixed right-[10%] top-20 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl"></div>
          <div className="fixed bottom-20 left-[5%] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200/40 bg-white/80 backdrop-blur-md dark:border-gray-800/40 dark:bg-gray-950/70">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/images/logos/company-logo-dark.svg"
                alt="OSSRanker"
                width={140}
                height={38}
                className="block h-9 w-auto dark:hidden"
                priority
              />
              <Image
                src="/images/logos/company-logo.svg"
                alt="OSSRanker"
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
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="web3-glow inline-flex items-center rounded-full bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-600 dark:bg-teal-500/20 dark:text-teal-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Web3-Powered Technology Ranking Platform
              </div>
            </div>

            <h1 className="animate-gradient-shift dark:animate-gradient-shift-dark bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl">
              Rank, Share, Earn with Web3{" "}
              <span className="font-black">OSS Rankings</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              OSSRanker is a Web3 incentive platform where you can create and
              vote on technology rankings, share insights, and earn tokens
              directly through your contributions.
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

        {/* How It Works Section */}
        {!session && (
          <div className="dark:web3-gradient-bg relative z-10 w-full bg-white/80 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  How It Works
                </h2>
                <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  OSSRanker combines technology rankings with Web3 token
                  incentives
                </p>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="web3-card-border floating-element flex flex-col items-center rounded-2xl border border-gray-100 bg-white/90 p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create Rankings
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Create curated lists of open-source technologies, tools, and
                    libraries
                  </p>
                </div>

                <div className="web3-card-border floating-element-delay-1 flex flex-col items-center rounded-2xl border border-gray-100 bg-white/90 p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Share Insights
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Generate shareable rankings for social media and collaborate
                    with the community
                  </p>
                </div>

                <div className="web3-card-border floating-element-delay-2 flex flex-col items-center rounded-2xl border border-gray-100 bg-white/90 p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Earn Tokens
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Get rewarded with OSR tokens for your contributions, votes,
                    and interactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!session && (
          <div className="relative z-10 w-full py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Platform Features
                </h2>
                <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Our Web3-native platform combines professional insights with
                  token rewards
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature Cards */}
                {[
                  {
                    title: "Token Incentive System",
                    description:
                      "Earn OSR tokens directly when you create rankings, vote, comment, and share content - no intermediary points system.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    title: "Community-Driven Rankings",
                    description:
                      "Create and vote on technology rankings that reflect real user experiences and professional insights.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    title: "Shareable Content",
                    description:
                      "Generate shareable ranking images with one-click for Twitter and other platforms to build your professional profile.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    title: "Content Monetization",
                    description:
                      "Create premium ranking extensions with tutorials and resources that others can unlock with tokens.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    title: "Personalized Dashboards",
                    description:
                      "Track your created rankings, earnings, and contribution history on your personal dashboard.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    title: "Web3 Governance",
                    description:
                      "Participate in platform governance with your tokens, influencing ranking algorithms and future features.",
                    icon: (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    ),
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="web3-card-border group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:border-teal-500/30"
                  >
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

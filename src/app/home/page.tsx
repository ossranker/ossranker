import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "~/server/auth";
import { SignOutButton } from "~/app/_components/SignOutButton";
import { VoteButton } from "~/app/_components/VoteButton";
import { db } from "~/server/db";
import { RepositoryCardSkeleton } from "~/app/_components/RepositoryCardSkeleton";
import { Suspense } from "react";

// First, let's define the Repository type
type Repository = {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  voteCount: number;
};

async function getLeaderboard() {
  return db.repository.findMany({
    orderBy: {
      voteCount: "desc",
    },
    take: 10,
  });
}

async function getCurrentVote(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyVote = await db.dailyVoteCount.findFirst({
    where: {
      userId: userId,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return dailyVote?.repositoryId;
}

function RepositoryGrid({
  leaderboard,
  currentVoteId,
}: {
  leaderboard: {
    id: string;
    name: string;
    fullName: string;
    description: string | null;
    url: string;
    stars: number;
    voteCount: number;
  }[];
  currentVoteId: string | undefined;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {leaderboard.map((repo, index) => (
        <div
          key={repo.id}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-800/50"
        >
          {index === 0 && (
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/10 text-sm font-medium text-yellow-300 backdrop-blur-sm">
              #1
            </div>
          )}
          {index === 1 && (
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-400/10 text-sm font-medium text-slate-300 backdrop-blur-sm">
              #2
            </div>
          )}
          {index === 2 && (
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-sm font-medium text-amber-500 backdrop-blur-sm">
              #3
            </div>
          )}
          {index > 2 && (
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/50 text-sm font-medium text-gray-400 backdrop-blur-sm">
              #{index + 1}
            </div>
          )}
          <RepositoryContent repo={repo} currentVoteId={currentVoteId} />
        </div>
      ))}
    </div>
  );
}

// Update the RepositoryContent component with proper typing
function RepositoryContent({
  repo,
  currentVoteId,
}: {
  repo: Repository; // Replace 'any' with our Repository type
  currentVoteId: string | undefined;
}) {
  return (
    <>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-800">
            <Image
              src={`https://avatars.githubusercontent.com/${repo.fullName.split("/")[0]}`}
              alt={repo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-200">{repo.fullName}</h3>
            <p className="text-sm text-gray-400">
              {repo.stars.toLocaleString()} stars
            </p>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm text-gray-400">
          {repo.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          View on GitHub →
        </Link>
        <VoteButton
          repoId={repo.id}
          currentVotes={repo.voteCount}
          isCurrentVote={repo.id === currentVoteId}
          repoName={repo.fullName}
        />
      </div>
    </>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <RepositoryCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const session = await auth();

  // Redirect to landing page if not authenticated
  if (!session) {
    redirect("/");
  }

  const currentVoteId = await getCurrentVote(session.user.id);
  const leaderboard = await getLeaderboard();

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800/40 bg-gray-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="transition-opacity hover:opacity-80">
            <Image
              src="/images/logos/company-logo.svg"
              alt="Company Name"
              width={140}
              height={38}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-gray-800"
                />
              )}
              <span className="hidden text-sm font-medium text-gray-200 sm:inline">
                {session.user?.name}
              </span>
            </div>
            <div className="h-6 w-px bg-gray-800" />
            <SignOutButton />
          </div>
        </div>
      </nav>

      {/* Content spacing for fixed navbar */}
      <div className="h-20 w-full" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {session.user?.name}
          </h1>
          <p className="mt-2 text-gray-400">
            Vote for your favorite open-source projects
          </p>
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <RepositoryGrid
            leaderboard={leaderboard}
            currentVoteId={currentVoteId ?? undefined}
          />
        </Suspense>
      </div>
    </main>
  );
}

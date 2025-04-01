export function RepositoryCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      {/* Rank Badge Skeleton */}
      <div className="absolute top-4 right-4 h-8 w-8 animate-pulse rounded-full bg-gray-800" />

      {/* Repository Info Skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-800" />
          <div className="flex-1">
            {/* Title Skeleton */}
            <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-800" />
            {/* Stars Skeleton */}
            <div className="h-4 w-20 animate-pulse rounded bg-gray-800" />
          </div>
        </div>
        {/* Description Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-800" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-800" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-gray-800" />
      </div>
    </div>
  );
}

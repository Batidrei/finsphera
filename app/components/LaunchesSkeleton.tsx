"use client";

/**
 * Loading skeleton that mimics the Launch grid layout.
 * Provides a smooth transition by matching the exact dimensions of real cards.
 * @component
 * @returns {JSX.Element} A shimmering placeholder UI.
 */
export default function LaunchesSkeleton() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="space-y-10 animate-pulse">
{/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 mt-25">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-100 dark:bg-zinc-800 rounded w-full pr-24"> </div>
          <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded w-full pl-19 pr-19"> </div>
        </div>

      </div>

      <div className="flex flex-wrap gap-4 justify-between">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 w-full md:w-[48%] lg:w-[23%] min-h-48 p-5 border-l-4 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl"
          >
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-800 shrink-0" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-1/2" />
              </div>
            </div>

            {/* Content: Date and Details mockups */}
            <div className="mt-auto space-y-3">
              <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-1/4" />
              <div className="space-y-2">
                <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded w-full" />
                <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded w-5/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
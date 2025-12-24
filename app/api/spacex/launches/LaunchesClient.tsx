"use client";

import { useEffect, useState, useMemo } from "react";
import type { Launch } from "@/app/types/spacex";
import Modal from "@/app/components/Modal";
import { motion } from "motion/react";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import ThemeToggle from "@/app/components/ThemeToggle";
import LaunchesSkeleton from "@/app/components/LaunchesSkeleton";
import ErrorState from "@/app/components/ErrorState"; // Asegúrate de crear este componente

/**
 * Client component that manages the visualization, filtering, and sorting
 * of SpaceX launches.
 * @component
 * @returns {JSX.Element} The mission dashboard.
 */
export default function LaunchesClient() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);

  /**
   * Fetches SpaceX data and handles errors.
   * @async
   */
  const fetchLaunches = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.spacexdata.com/v5/launches");

      if (!res.ok) throw new Error("Could not connect to SpaceX database");

      const data: Launch[] = await res.json();
      const processed = data
        .filter((l) => l.success !== null)
        .slice(0, 28);

      setLaunches(processed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  /**
   * Memoized logic to sort and group launches.
   */
  const chunks = useMemo(() => {
    const sorted = [...launches].sort((a, b) => {
      const dateA = new Date(a.date_utc).getTime();
      const dateB = new Date(b.date_utc).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const result = [];
    for (let i = 0; i < sorted.length; i += 4) {
      result.push(sorted.slice(i, i + 4));
    }
    return result;
  }, [launches, sortOrder]);

  const openModal = (launch: Launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  // 1. Loading State
  if (loading) return (
    <section className="space-y-6 p-6 transition-colors duration-300">
      <ScrollIndicator />
      <LaunchesSkeleton />
    </section>
  );

  // 2. Error State
  if (error) return (
    <section className="p-6 flex justify-center items-center min-h-[60vh]">
      <ErrorState message={error} onRetry={fetchLaunches} />
    </section>
  );

  return (
    <section className="space-y-6 p-6 transition-colors duration-300">
      <ScrollIndicator />

      {/* Filter Bar */}
      <div className="flex flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 mt-25">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">Order by date:</span>
          <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sortOrder === "asc" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
              }`}
            >
              Oldest
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sortOrder === "desc" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
              }`}
            >
              Newest
            </button>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Card Grid */}
      <div className="space-y-10">
        {chunks.map((group, groupIndex) => (
          <div key={`${sortOrder}-${groupIndex}`} className="flex flex-wrap gap-4 justify-between">
            {group.map((launch) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={launch.id}
                onClick={() => openModal(launch)}
                className="flex flex-col gap-3 w-full md:w-[48%] lg:w-[23%] min-h-48 p-5 border border-l-4 rounded-xl cursor-pointer bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeftColor: launch.success ? '#166534' : '#991b1b' }}
              >
                <div className="flex gap-4 items-start">
                  {launch.links.patch.small && (
                    <img src={launch.links.patch.small} className="w-16 h-16 object-contain shrink-0" alt={launch.name} />
                  )}
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h2 className="font-bold truncate">{launch.name}</h2>
                    <div>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${launch.success ? "bg-green-700" : "bg-red-700"}`}>
                        {launch.success ? "SUCCESS" : "FAILED"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-zinc-400 mt-auto flex">
                  <span className="font-semibold mr-1">Date:</span>
                  <span>{new Date(launch.date_utc).toLocaleDateString()}</span>
                </div>
              </motion.article>
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLaunch(null);
        }}
        title={selectedLaunch ? selectedLaunch.name : "SpaceX Information"}
      >
        {selectedLaunch ? (
          <div className="space-y-4">
            <div className="flex justify-center bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-4">
              <img
                src={selectedLaunch.links.patch.small ?? "/404.png"}
                className="w-32 h-32 object-contain"
                alt="patch"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-zinc-300">
                <strong className="text-gray-900 dark:text-white">Details:</strong>{" "}
                {selectedLaunch.details || "No details available for this mission."}
              </p>
              <p className="text-sm text-gray-700 dark:text-zinc-300">
                <strong className="text-gray-900 dark:text-white">Flight Number:</strong>{" "}
                {selectedLaunch.flight_number}
              </p>

              {/* Embed Youtube with extra safety */}
              {selectedLaunch.links.youtube_id && (
                 <div className="rounded-xl overflow-hidden mt-4">
                    <iframe
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${selectedLaunch.links.youtube_id}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                 </div>
              )}
            </div>

            {selectedLaunch.links.article && (
              <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                <a
                  href={selectedLaunch.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  Read full article <span>→</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="dark:text-zinc-400">Loading details...</p>
        )}
      </Modal>
    </section>
  );
}
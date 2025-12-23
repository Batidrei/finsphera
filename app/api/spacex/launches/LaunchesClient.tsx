"use client";

import { useEffect, useState, useMemo } from "react";
import type { Launch } from "@/app/types/spacex";
import Modal from "@/app/components/Modal";
import { motion, AnimatePresence } from "motion/react";
import ScrollIndicator from "@/app/components/ScrollIndicator";

/**
 * Client component that manages the visualization, filtering, and sorting
 * of SpaceX launches.
 * * @component
 * @returns {JSX.Element} The mission dashboard with sorting controls and details modal.
 */
export default function LaunchesClient() {
  /** @type {Launch[]} State that stores the list of launches obtained from the API. */
  const [launches, setLaunches] = useState<Launch[]>([]);

  /** @type {boolean} State that controls the initial loading indicator. */
  const [loading, setLoading] = useState(true);

  /** @type {"asc" | "desc"} State that defines the chronological order of the launches. */
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /** @type {boolean} State that controls the visibility of the Modal component. */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** @type {Launch | null} State that stores the selected launch to display in the modal. */
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);

  /**
   * Effect that fetches the SpaceX v5 API data on component mount.
   * Filters launches without results and limits the sample to the first 28 records.
   * * @async
   */
  useEffect(() => {
    fetch("https://api.spacexdata.com/v5/launches")
      .then((res) => res.json())
      .then((data: Launch[]) => {
        const processed = data
          .filter((l) => l.success !== null)
          .slice(0, 28);
        setLaunches(processed);
      })
      .catch((err) => console.error("Error fetching SpaceX data:", err))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Processes and groups launches into blocks of 4 for row-based visualization.
   * Automatically recalculates when the launch list or sort order changes.
   * * @constant
   * @type {Launch[][]}
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

  /**
   * Handles opening the modal and assigning the selected launch.
   * * @param {Launch} launch - The launch object the user wants to inspect.
   * @returns {void}
   */
  const openModal = (launch: Launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  if (loading) return <p className="p-6 text-blue-900 dark:text-blue-400 font-medium animate-pulse">Loading launches...</p>;

  return (
    <section className="space-y-6 p-6 transition-colors duration-300">
      <ScrollIndicator />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">Order by date:</span>
          <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${sortOrder === "asc" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                }`}
            >
              Oldest
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${sortOrder === "desc" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                }`}
            >
              Newest
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-300">Showing {launches.length} missions</p>
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
        {/* Content starts here */}
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
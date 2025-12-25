import LaunchesClient from "./api/spacex/launches/LaunchesClient";

export default function LaunchesPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-200 dark:bg-zinc-800">
      <div className="flex items-center p-8 shadow-md dark:bg-zinc-900 dark:border-zinc-800 bg-white fixed w-full">
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
          Last launches
        </h1>
      </div>
      <LaunchesClient />
    </div>
  );
}
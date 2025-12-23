import LaunchesClient from "./api/spacex/launches/LaunchesClient";
import ThemeToggle from "./components/ThemeToggle";

export default function LaunchesPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-zinc-800">
      <div className="flex items-center p-8 shadow-md dark:bg-zinc-900 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white mr-1">
          Last launches
        </h1>
        <ThemeToggle></ThemeToggle>
      </div>
      <LaunchesClient />
    </div>
  );
}
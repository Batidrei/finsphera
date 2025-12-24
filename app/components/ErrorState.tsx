"use client";

/**
 * Component to display when an API error occurs.
 * @component
 * @param {Object} props
 * @param {string} props.message - The error message to display.
 * @param {() => void} props.onRetry - Function to trigger a new fetch attempt.
 */
export default function ErrorState({ message, onRetry }: { message: string, onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-gray-600 dark:text-zinc-400 mb-6 max-w-xs">{message}</p>
      <img alt="404 image error" className="object-contain w-100" sizes="(max-width: 1200px) 100vw, 512px" src="/ErrorAPI.png"/>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium cursor-pointer mt-5"
      >
        Try again
      </button>
    </div>
  );
}
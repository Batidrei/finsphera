"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-zinc-200 transition-all active:scale-95 hover:ring-2 ring-blue-500 cursor-pointer"
    >
      {resolvedTheme === "dark" ? (
        <><span>☀️</span></>
      ) : (
        <><span>🌙</span></>
      )}
    </button>
  );
}
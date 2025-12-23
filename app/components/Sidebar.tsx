"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para cerrar el sidebar al hacer click en un link (en mobile)
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* 1. Botón Hamburguesa - Solo visible en mobile (lg:hidden) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-8 right-6 p-2 bg-white text-shadow-gray-950 shadow-2xs rounded-lg shadow-lg active:scale-90 transition-transform"
      >
        {isOpen ? "✕ Cerrar" : "☰ Menú"}
      </button>

      {/* 2. Overlay - Fondo oscuro cuando el sidebar está abierto en mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 3. El Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 z-[50]
          bg-blue-950 dark:bg-zinc-950 text-white flex flex-col p-5 shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
        `}
      >
        <h2 className="text-2xl font-bold mb-10 tracking-tight">FINSPHERA</h2>
        
        <nav className="flex flex-col gap-4">
          <Link 
            href="/" 
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-900 dark:hover:bg-zinc-800 transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        {/* Footer del sidebar opcional */}
        <div className="mt-auto pt-6 border-t border-blue-900 dark:border-zinc-800 text-xs text-blue-300/50">
          © 2025 SpaceX by Finsphera
        </div>
      </aside>
    </>
  );
}
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center dark:bg-zinc-800 h-lvh">
            {/* Animación del número 404 */}
            {/* <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2
                }}
                className="text-9xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-2xl"
            >
                404
            </motion.h1> */}

            <div className="relative w-64 h-64 mx-auto">
                <Image
                    src="/404.png"
                    alt="404 image error"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 256px"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    Misión Perdida en el Espacio
                </h2>
                <p className="mt-2 text-gray-600 dark:text-zinc-400 max-w-md">
                    Parece que el módulo de navegación ha fallado. La página que buscas no existe o ha sido movida a otra órbita.
                </p>
            </motion.div>

            {/* Botón de regreso con efecto hover de Motion */}
            <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    href="/"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg shadow-blue-500/30 inline-block"
                >
                    Volver a la Tierra (Home)
                </Link>
            </motion.div>

            {/* Un pequeño elemento decorativo "espacial" */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -z-10 opacity-10 dark:opacity-20 pointer-events-none"
            >
                <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </motion.div>
        </div>
    );
}
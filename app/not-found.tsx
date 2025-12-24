"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center dark:bg-zinc-800 h-lvh overflow-hidden">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    repeatType: "mirror",
                    duration: 2
                }}
                className="text-9xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-2xl"
            >
                404
            </motion.h1>

            <div className="relative w-96 h-96 mx-auto">
                <Image
                    src="/404.png"
                    alt="404 image error"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 512px"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    Lost mission in space
                </h2>
                <p className="mt-2 text-gray-600 dark:text-zinc-400 max-w-md">
                    It appears the navigation module has failed. The page you are looking for does not exist or has been moved to another orbit.
                </p>
            </motion.div>

            <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    href="/"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg shadow-blue-500/30 inline-block"
                >
                    Return to Earth (Home)
                </Link>
            </motion.div>
        </div>
    );
}
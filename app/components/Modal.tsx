"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Fondo (Overlay) Animado */}
          <motion.div
            ref={overlayRef}
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 2. Contenedor del Modal Animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/30 dark:border-zinc-700/30 rounded-2xl shadow-2xl w-full max-w-lg p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              &times;
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold dark:text-white">{title}</h3>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                className="h-1 bg-pink-600 rounded-full mt-1" 
              />
            </div>
            
            <div className="dark:text-zinc-300">
              {children}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-6 py-2 rounded-xl font-medium active:scale-95 transition-transform cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
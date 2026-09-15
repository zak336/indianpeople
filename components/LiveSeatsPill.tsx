"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const SURGE_MESSAGES = [
  "🔥 High demand: 3 bookings in last 2 hours",
  "⚡ Fast filling up for October",
  "✨ 6/16 seats left · Varkala Oct 19",
];

export default function LiveSeatsPill() {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Slide down slightly after load for a nice entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % SURGE_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw]"
        >
          {/* Glassmorphism Pill */}
          <div className="bg-white/95 dark:bg-black/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-full px-5 py-2.5 flex items-center gap-3">
            
            {/* Live Pulsing Dot */}
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>

            {/* Icon (Optional) */}
            <Users size={14} className="text-zinc-500 hidden sm:block" />

            {/* Ticker Text */}
            <div className="relative overflow-hidden h-5 w-56 sm:w-64 text-sm font-medium text-zinc-800 dark:text-zinc-200 tracking-tight">
              <AnimatePresence mode="wait">
                <motion.span
                  key={messageIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center whitespace-nowrap"
                >
                  {SURGE_MESSAGES[messageIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

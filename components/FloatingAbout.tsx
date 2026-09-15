"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const founderVideoId = "hgaiQSp0ugo";
const founderVideoUrl = `https://www.youtube.com/embed/${founderVideoId}?rel=0&modestbranding=1`;
const founderThumbnailUrl = `https://i.ytimg.com/vi/${founderVideoId}/hqdefault.jpg`;

export default function FloatingAbout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 z-50 -translate-y-1/2 md:right-6">
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.aside
            key="panel"
            initial={{ opacity: 0, x: "110%", scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: "110%", scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
            className="max-h-[calc(100vh-2rem)] w-[min(52rem,calc(100vw-2rem))] overflow-y-auto overflow-x-hidden rounded-3xl border border-white/15 bg-(--basalt) text-white shadow-2xl shadow-black/20"
            aria-label="About Sync Retreat"
          >
            <div className="relative grid gap-7 p-5 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:p-8">
              <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full border border-(--copper)/30" />
              <div className="absolute -right-5 -top-9 h-24 w-24 rounded-full border border-(--copper)/20" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close About us"
                className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
              <div className="relative self-center pt-8 md:pt-0">
                <div className="mb-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-(--copper-light)">
                    THE FOUNDERS
                  </p>
                </div>
                <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg">
                  <iframe
                    src={founderVideoUrl}
                    title="Sync Retreat founder story"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="relative flex flex-col justify-center pt-8 md:pt-0">
                <p className="mb-3 pr-8 font-mono text-xs uppercase tracking-[0.25em] text-(--copper-light)">ABOUT SYNC RETREAT</p>
                <h2 className="max-w-md font-serif text-3xl leading-tight text-stone-100 md:text-4xl">
                  We invite you to join our <span className="text-(--copper-light)">community.</span>
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-300">
                  <p>We wanted more than a beautiful place to visit. We wanted reliable infrastructure and the right people to share the journey with.</p>
                  <p>So we built structured workations for curious, ambitious professionals who take their work seriously and still make room for discovery, culture, and connection.</p>
                  <p>We are remote builders who got tired of rolling the dice on bad Wi-Fi in Airbnbs. Sync Retreat is our answer: a new city to call home, with space to co-live, co-work, and collaborate.</p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-(--copper)/60">
                    <Image src={founderThumbnailUrl} alt="Zakee Ahmed & Manotosh Kumar Phade from the founder video thumbnail" fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-(--copper-light)">Built by</p>
                    <p className="mt-1 text-base font-bold text-zinc-100">
                      Zakee Ahmed &amp;<br />
                      Manotosh Kumar Phade
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.aside>
        ) : (
          <motion.button
            key="tab"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/95 px-4 py-3 text-(--copper) shadow-xl backdrop-blur-xl transition hover:border-(--copper)/40 hover:shadow-2xl"
            aria-label="Open About us"
          >
            <span className="h-2 w-2 rounded-full bg-(--copper)" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">About us</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

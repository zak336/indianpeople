"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  {
    tabLabel: "The Problem",
    title: "Your best work doesn't happen in the noise.",
    description:
      "Between Slack pings, city commutes, and a life that never turns off — India's remote workers, freelancers, and founders are burning out. You don't need a vacation. You need dedicated time in a new environment where the only variable left is your output.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    index: "01",
  },
  {
    tabLabel: "The Spaces",
    title: "Premium Co-Living & Co-Working Spaces",
    description:
      "Curated properties at India's most scenic locations — coastal villas in Varkala, mountain chalets in Manali, heritage havelis in Jaipur. Each with private ensuite rooms, ergonomic workstations, and fast, redundant internet.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop",
    index: "02",
  },
  {
    tabLabel: "The Community",
    title: "A Curated Peer Community",
    description:
      "Work alongside 10–15 vetted remote workers, freelancers, independent consultants, creative professionals, and early-stage founders. No forced networking. A natural community that builds itself through shared space and shared goals.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
    index: "03",
  },
  {
    tabLabel: "The Balance",
    title: "Work Week + Weekend Exploration",
    description:
      "Structured deep-work weekdays with optional weekend explorations — cliff walks in Varkala, sunrise hikes in Manali, heritage trails in Jaipur. The right balance of productivity and experience that recharges, not distracts.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop",
    index: "04",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const active = features[activeTab];

  return (
    <section id="about" className="bg-white text-zinc-900 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-[0.4em] text-(--copper) uppercase mb-2 block">
              WHO IT&apos;S FOR
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
              Built for India&apos;s remote generation.
            </h2>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap gap-1 md:gap-2 border border-stone-200 p-1 rounded-full bg-stone-50 shrink-0 self-start md:self-end">
            {features.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute inset-0 bg-copper rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{feature.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audience segments pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["Freelancers & Agency Owners", "Creative Professionals", "Remote Tech Workers", "Burned-out Employees", "Early-stage Founders", "Corporate Teams"].map((seg) => (
            <span key={seg} className="px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-zinc-600 uppercase tracking-wider">
              {seg}
            </span>
          ))}
        </div>

        <div className="w-full h-px bg-stone-200 mb-10" />

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col md:flex-row gap-10 md:gap-16 items-center"
          >
            {/* Image */}
            <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl border border-zinc-100 shrink-0 relative aspect-[4/3]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-mono text-(--copper) mb-2 uppercase tracking-[0.2em]">
                {active.index} // Sync Retreat
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-4">
                {active.title}
              </h3>
              <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed">
                {active.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

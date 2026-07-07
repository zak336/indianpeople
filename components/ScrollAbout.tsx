"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll progress to update active tab state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveTab(0);
    } else if (latest >= 0.25 && latest < 0.50) {
      setActiveTab(1);
    } else if (latest >= 0.50 && latest < 0.75) {
      setActiveTab(2);
    } else {
      setActiveTab(3);
    }
  });

  // Handle smooth scroll when clicking on a tab
  const handleTabClick = (idx: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollRange = container.scrollHeight - window.innerHeight;

    let targetProgress = 0;
    if (idx === 0) targetProgress = 0.05;
    else if (idx === 1) targetProgress = 0.375;
    else if (idx === 2) targetProgress = 0.625;
    else if (idx === 3) targetProgress = 0.875;

    window.scrollTo({
      top: containerTop + (targetProgress * scrollRange),
      behavior: "smooth"
    });
  };

  // Slide transitions (Right to Left)
  const x0 = useTransform(scrollYProgress, [0, 0.20, 0.30, 1], ["0%", "0%", "-100%", "-100%"]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.20, 0.30, 1], [1, 1, 0, 0]);

  const x1 = useTransform(scrollYProgress, [0, 0.20, 0.30, 0.45, 0.55, 1], ["100%", "100%", "0%", "0%", "-100%", "-100%"]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.20, 0.30, 0.45, 0.55, 1], [0, 0, 1, 1, 0, 0]);

  const x2 = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.70, 0.80, 1], ["100%", "100%", "0%", "0%", "-100%", "-100%"]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.70, 0.80, 1], [0, 0, 1, 1, 0, 0]);

  const x3 = useTransform(scrollYProgress, [0, 0.70, 0.80, 1], ["100%", "100%", "0%", "0%"]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.70, 0.80, 1], [0, 0, 1, 1]);

  const features = [
    {
      tabLabel: "The Problem",
      title: "Your best work doesn't happen in the noise.",
      description: "Your best work doesn't happen between Slack pings, co-working noise, and a city that never turns off. You don't need a vacation. You need 14 days where the only variable left is your output.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
      x: x0,
      opacity: opacity0,
      index: "01"
    },
    {
      tabLabel: "Villa & Workspace",
      title: "A Private Villa & Workspace",
      description: "A single-occupancy workspace and private room. Designed as a personal sanctuary optimized for deep rest, hot showers, and absolute privacy.",
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1138245562661282426/original/f218e700-8949-4ab8-ade7-8196d4fa5e8c.jpeg?im_w=1440",
      x: x1,
      opacity: opacity1,
      index: "02"
    },
    {
      tabLabel: "Redundant Fiber",
      title: "Dual-WAN Redundant Fiber",
      description: "Commercial-grade Starlink + Local Fiber backup and dedicated generators to ensure zero downtime and verified uptime at 3,524m altitude.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1470&auto=format&fit=crop",
      x: x2,
      opacity: opacity2,
      index: "03"
    },
    {
      tabLabel: "Curated Cohort",
      title: "Curated Cohort & Zero Itinerary",
      description: "A vetted cohort of 10-15 founders and operators. Zero itinerary. Zero 'team bonding' exercises. Pure deep-work architecture to get your milestone shipped.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
      x: x3,
      opacity: opacity3,
      index: "04"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="relative z-25 h-[400vh] bg-white text-zinc-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-16">
        
        {/* Header & Tabs Container */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 mb-10 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
                DEEP WORK ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
                You don't need a vacation. You need 14 days of focus.
              </h2>
            </div>

            {/* Tab Controls */}
            <div className="flex flex-wrap gap-2 md:gap-3 border border-stone-200 p-1.5 rounded-full bg-stone-50 shrink-0 self-start md:self-end">
              {features.map((feature, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleTabClick(idx)}
                    className={`relative px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full cursor-pointer transition-colors duration-300 ${
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
          <div className="w-full h-px bg-stone-200" />
        </div>

        {/* Sliding Card Frame */}
        <div className="relative flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 overflow-hidden h-[65vh] md:h-[50vh] min-h-[540px] md:min-h-[400px]">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              style={{ x: item.x, opacity: item.opacity }}
              className="absolute inset-x-6 md:inset-x-12 lg:inset-x-24 bottom-0 top-0 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between bg-white"
            >
              {/* Image Frame */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl border border-zinc-100 shrink-0 relative h-48 sm:h-64 md:h-[85%]">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-mono text-[var(--copper)] mb-2 uppercase tracking-[0.2em]">{item.index} // Sync Infrastructure</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
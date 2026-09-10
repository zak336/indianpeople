"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight, MapPin } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} id="home" className="relative z-0 h-screen">
      <section className="sticky top-0 h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Image
              src="/houseboat.jpg"
              alt="Scenic houseboat in Kerala — Sync Retreat workation programs"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </motion.div>
          {/* Darker gradient overlay for better text legibility */}
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,124,46,0.15),transparent_60%)] pointer-events-none" />
        </div>

        <Link
          href="#home"
          aria-label="Sync Retreat home"
          className="absolute left-5 top-5 z-20 flex items-center gap-3.5 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 text-white backdrop-blur-md transition hover:border-(--copper-light)/70 hover:bg-black/35 md:left-8 md:top-7"
        >
          <span className="relative h-13 w-13 overflow-hidden rounded-full border border-white/40 bg-white/90 shadow-lg md:h-14 md:w-14">
            <Image
              src="/Logo.jpeg"
              alt="Sync Retreat logo"
              fill
              priority
              className="object-contain p-1"
            />
          </span>
          <span className="pr-1 text-left">
            <span className="block font-serif text-lg leading-none tracking-tight md:text-xl">Sync Retreat</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">India</span>
          </span>
        </Link>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity, y }}
        >
          <div className="flex flex-col items-center gap-5 text-center text-white px-4 max-w-5xl">
            {/* Next retreat badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin size={12} className="text-(--copper-light)" />
              <span className="text-xs font-mono tracking-[0.3em] text-white/90 uppercase">
                Next Retreat: Varkala, Kerala · Oct to Feb
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs md:text-sm font-mono tracking-[0.5em] text-(--copper-light) uppercase drop-shadow-md"
            >
              Sync Retreat · India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="text-4xl md:text-[5rem] leading-none font-serif font-medium tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
            >
              A 14-Day Workation in Varkala for Remote Professionals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg font-sans font-medium tracking-wide max-w-2xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-zinc-100 mt-2"
            >
              A structured coastal retreat with a private room, dedicated desk, reliable connectivity, meals, community, and weekend experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-6"
            >
              <Link
                href="/checkout"
                style={{ background: "var(--copper)" }}
                className="px-8 py-4 rounded-full flex items-center gap-3 text-white font-sans font-bold uppercase tracking-wide cursor-pointer shadow-xl shadow-(--copper)/30 hover:shadow-(--copper)/50 hover:scale-105 transition-all duration-300"
              >
                <span>Check Dates &amp; Reserve</span>
                <ChevronRight size={20} />
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="#pricing"
                className="px-8 py-4 rounded-full flex items-center gap-3 text-white font-sans font-semibold border border-white/30 hover:border-white/60 hover:bg-white/10 uppercase tracking-wide transition-all duration-300 backdrop-blur-sm"
              >
                <span>See What&apos;s Included</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-[10px] font-mono uppercase tracking-wider text-zinc-300"
            >
              Deposit refundable until September 19, 2026.
            </motion.p>

            <a
              href="https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-(--copper-light)/70 bg-(--copper)/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-black/10 transition hover:bg-(--copper)/40 hover:text-white"
            >
              Join our Community
            </a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-8 mt-8 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] border-t border-white/20 pt-6"
            >
              <a
                href="#about"
                className="hover:text-(--copper-light) transition-colors duration-300"
              >
                Who It&apos;s For
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <a
                href="#destinations"
                className="hover:text-(--copper-light) transition-colors duration-300"
              >
                Destinations
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <a
                href="#pricing"
                className="hover:text-(--copper-light) transition-colors duration-300"
              >
                Plans & Pricing
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

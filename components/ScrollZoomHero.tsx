"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

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
    <div ref={ref} id="home" className="relative z-0 h-[100vh]">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,124,46,0.15),transparent_60%)] pointer-events-none" />
        </div>

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
              <MapPin size={12} className="text-[var(--copper-light)]" />
              <span className="text-xs font-mono tracking-[0.3em] text-white/90 uppercase">
                Next Retreat: Varkala, Kerala — Oct 19
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs md:text-sm font-mono tracking-[0.5em] text-[var(--copper-light)] uppercase drop-shadow-md"
            >
              Sync Retreat · India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="text-4xl md:text-[5rem] leading-none font-serif font-medium tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
            >
              Work Remotely.
              <br />
              <span className="italic text-[var(--copper-light)]">Explore India.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg font-sans font-medium tracking-wide max-w-2xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-zinc-100 mt-2"
            >
              A 14-day curated workation combining enterprise-grade infrastructure with coastal living. Zero operational friction. Maximum output.
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
                className="px-8 py-4 rounded-full flex items-center gap-3 text-white font-sans font-bold uppercase tracking-wide cursor-pointer shadow-xl shadow-[var(--copper)]/30 hover:shadow-[var(--copper)]/50 hover:scale-105 transition-all duration-300"
              >
                <span>Reserve a Spot — ₹29,999 Deposit</span>
                <ChevronRight size={20} />
              </Link>
              <a
                href="https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full flex items-center gap-3 text-white font-sans font-semibold border border-white/30 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 uppercase tracking-wide transition-all duration-300 backdrop-blur-sm"
              >
                <BsWhatsapp size={18} className="text-[#25D366]" />
                <span>Join our Community</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-[10px] font-mono uppercase tracking-wider text-zinc-300"
            >
              Fully refundable up to 30 days before retreat start.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-8 mt-8 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] border-t border-white/20 pt-6"
            >
              <a href="#about" className="hover:text-[var(--copper-light)] transition-colors duration-300">
                Who It&apos;s For
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <a href="#destinations" className="hover:text-[var(--copper-light)] transition-colors duration-300">
                Destinations
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <a href="#pricing" className="hover:text-[var(--copper-light)] transition-colors duration-300">
                Plans & Pricing
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

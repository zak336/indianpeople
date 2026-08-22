"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function FounderCredibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 bg-stone-50 border-t border-stone-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div style={{ opacity }} className="max-w-xl">
            <span className="text-xs font-mono tracking-[0.4em] text-(--copper) uppercase mb-4 block">
              THE CREDIBILITY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-zinc-900 mb-6">
              Built by remote workers, for remote workers.
            </h2>
            <div className="space-y-4 text-zinc-600 font-sans text-sm md:text-base leading-relaxed">
              <p>
                We spent years bouncing between noisy hostels, overpriced Airbnbs with unreliable Wi-Fi, and sterile corporate hotels. 
                None of them were built for actual deep work.
              </p>
              <p>
                Sync Retreat was born out of frustration. We needed a place in India&apos;s most inspiring locations where the 
                infrastructure was enterprise-grade, but the experience was deeply local and community-driven.
              </p>
              <p className="font-bold text-zinc-900">
                You&apos;re trusting us with an upfront deposit. We&apos;re here to ensure every detail — from the desk ergonomics to the dual-WAN internet — is flawless.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden relative border-2 border-white shadow-sm">
                 <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Founder" fill className="object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden relative border-2 border-white shadow-sm -ml-6">
                 <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Founder" fill className="object-cover" />
              </div>
              <div className="ml-2 flex flex-col">
                <span className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-widest">The Team</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Sync Retreat India</span>
              </div>
            </div>
          </motion.div>

          {/* Video / Walkthrough */}
          <motion.div style={{ y }} className="relative h-100 md:h-125 w-full rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 border border-stone-200 bg-zinc-200">
            {/* 30-sec property/founder walkthrough clip */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
            >
              {/* Note: Using a placeholder URL. User will replace with raw Ladakh footage URL */}
              <source src="https://cdn.coverr.co/videos/coverr-working-in-a-sunny-office-2621/1080p.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-mono text-white tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Property Walkthrough
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

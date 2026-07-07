import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { div } from "framer-motion/client";
import { useRef } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

const MotionImage = motion(Image);

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textColor = useTransform(scrollYProgress, [0,0.2], ["#ffffff", "#0e0e0e"] );
  const blur = useTransform(scrollYProgress, [0, 1], [8, 20]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const MotionArrow = motion(ArrowRight);
  const imageFilter = useMotionTemplate`
    blur(${blur}px)
    brightness(${brightness})
  `;

 return (
  <div ref={ref} id="home" className="relative h-[200vh]">
    <section className="sticky top-0 h-screen overflow-hidden">
      <div className="relative w-full h-full">
        <MotionImage
          src="/assets/hero.jpeg"
          alt="Sync Retreat - Mountain landscape in Leh, Ladakh at 3,524m altitude"
          fill
          priority
          className="object-cover"
          style={{
            scale,
            filter: imageFilter,
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity,
          y,
        }}
      >
        
        <div className="flex flex-col items-center gap-4 text-center text-white px-4">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm font-mono tracking-[0.5em] text-[var(--copper)] uppercase drop-shadow-md"
          >
            Ladakh Execution Sprint
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-[5.5rem] leading-none font-serif font-medium tracking-tight drop-shadow-2xl max-w-4xl"
          >
            14 Days. Zero Distractions. One Output.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg font-sans font-light tracking-wide max-w-2xl mx-auto drop-shadow-md text-zinc-200 mt-2"
          >
            A precision-built execution environment in Ladakh for founders and teams who need to ship — not unwind.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-2 mt-8"
          >
            <Link 
              href="/checkout"
              style={{ background: "var(--copper)" }}
              className="px-8 py-4 rounded-full flex items-center gap-3 text-white font-sans font-bold uppercase tracking-wide cursor-pointer shadow-xl shadow-[var(--copper)]/30 hover:shadow-[var(--copper)]/50 hover:bg-[var(--copper-dark)] transition-all"
            >
              <span>Reserve Your Seat — ₹25,000 Deposit</span>
              <ChevronRight size={20} />
            </Link>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 mt-2">
              Fully refundable up to 30 days before cohort start.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-8 mt-12 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] border-t border-white/20 pt-6"
          >
            <a href="#about" className="hover:text-[var(--copper)] transition-colors duration-300">
              The Problem
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <a href="#programs" className="hover:text-[var(--copper)] transition-colors duration-300">
              How It Works
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  </div>
);
}
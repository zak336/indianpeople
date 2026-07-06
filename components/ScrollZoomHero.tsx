import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { div } from "framer-motion/client";
import { useRef } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

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
  const blur = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const MotionArrow = motion(ArrowRight);
  const imageFilter = useMotionTemplate`
    blur(${blur}px)
    brightness(${brightness})
  `;

 return (
  <div ref={ref} className="relative h-[200vh]">
    <section className="sticky top-0 h-screen overflow-hidden">
      <motion.img
        src="/assets/hero.jpeg"
        alt="Sync Retreat - Mountain landscape in Leh, Ladakh at 3,524m altitude"
        className="w-full h-full object-cover"
        style={{
          scale,
          filter: imageFilter,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity,
          y,
        }}
      >
        
        <div className="flex flex-col items-center gap-6">
          <motion.h1 className="text-8xl font-bold text-white">
            SYNC RETREAT.
          </motion.h1>

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={{ background: "var(--copper)" }}
  className="px-8 py-3 rounded-full flex items-center gap-2 text-white font-medium cursor-pointer"
  aria-label="Reserve your seat for the 14-day founder retreat program"
>
  <span>Reserve seat</span>

  <motion.div
    animate={{ x: [0, 5, 0] }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className=""
  >
    <ChevronRight size={18} />
  </motion.div>
</motion.button>
        </div>
      </motion.div>
    </section>
  </div>
);
}
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  "https://picsum.photos/id/1018/800/1000",
  "https://picsum.photos/id/1018/800/1200",
  "https://picsum.photos/id/1018/800/3000",
  "https://picsum.photos/id/1018/800/4000",
  "https://picsum.photos/id/1018/800/1400",
];

export default function HorizontalGallery() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move gallery from left to right
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={ref} className="relative h-[300vh]">
<div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center">
            <motion.div
          style={{ x }}
          className="flex gap-8 px-20"
        >
          {images.map((src) => (
            <img
              key={src}
              src={src}
              className="h-[80vh] w-[60vw] rounded-3xl object-cover flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
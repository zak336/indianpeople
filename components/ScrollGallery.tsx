"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  cubicBezier,
} from "framer-motion";
import { useMemo, useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    title: "Pangong Tso",
    subtitle: "Crystal blue alpine lake",
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    title: "Nubra Valley",
    subtitle: "Cold desert & sand dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    title: "Leh",
    subtitle: "Gateway to the Himalayas",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    title: "Thiksey Monastery",
    subtitle: "Ancient Buddhist heritage",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    title: "Tso Moriri",
    subtitle: "Peaceful high-altitude lake",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    title: "Khardung La",
    subtitle: "Legendary mountain pass",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    title: "Prayer Flags",
    subtitle: "Spirit of Ladakh",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    title: "Himalayan Retreat",
    subtitle: "Reconnect with nature",
  },
];
export default function ScrollGallery() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const progress = useSpring(scrollYProgress);
const spacing = 260;

const cards = images.map((_, i) => {
  // Center the entire gallery
  const offset = i - (images.length - 1) / 2;

  return {
    x: offset * spacing + (Math.random() - 0.5) * 40,

    // Small vertical variation
    y: (Math.random() - 0.5) * 120,

    // Slight rotation for editorial feel
    rotate: (Math.random() - 0.5) * 12,

    // Slight scale variation
    scale: 0.95 + Math.random() * 0.08,

    // Layering
    z: Math.random() * 100,
  };
});

  return (
    <section
      ref={ref}
      className="relative h-[350vh] bg-white-100"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 border-b border-dashed border-stone-300 pb-6 pt-10 mb-20 text-center">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-stone-900">
            The Spirit of Ladakh
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-900">
            Witness timeless landscapes, sacred traditions, and moments that reconnect you with nature.
          </p>
        </div>


                 {images.map((images, i) => {
    const delay = i * 0.07;const x = useTransform(
  progress,
  [0, 0.85, 1],
  [0, cards[i].x * 1.08, cards[i].x]
);

const y = useTransform(
  progress,
  [0, 1],
  [0, cards[i].y]
);

const rotate = useTransform(
  progress,
  [0, 1],
  [0, cards[i].rotate]
);

const scale = useTransform(
  progress,
  [0, 0.6, 1],
  [0.85, 1.05, cards[i].scale]
);
const opacity = useTransform(
  progress,
  [delay, delay + 0.15],
  [0, 1]
);

const blur = useTransform(
  progress,
  [0, 0.25],
  ["8px", "0px"]
);
          return (
            <motion.img
              key={i}
              src={images.src}
              alt=""
              drag
              dragElastic={0.15}
              whileHover={{
                scale: 1.08,
                zIndex: 100,
              }}
              style={{
                 x,
    y,
    rotate,
    scale,
    opacity:opacity,
    filter: blur,
    transformPerspective: 1000,
    transformStyle: "preserve-3d",
              }}
              className="absolute
                         w-100
                         h-90
                         rounded-2xl
                         object-cover
                         shadow-2xl
                         cursor-grab"
            />
          );
        })}
      </div>
    </section>
  );
}
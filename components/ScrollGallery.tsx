"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const MotionImage = motion(Image);

const images = [
  {
    src: "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop",
    title: "Ladakh",
    subtitle: "High Altitude Retreat",
  },
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Deep Focus Co-Working Hub",
    subtitle: "Ergonomic workstations",
  },
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-s/06/9d/27/42/cold-desert-camp.jpg",
    title: "Weekend Trips",
    subtitle: "High-altitude expeditions",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1138245562661282426/original/f218e700-8949-4ab8-ade7-8196d4fa5e8c.jpeg?im_w=1440",
    title: "Private Executive Quarters",
    subtitle: "Private sanctuary",
  },
  {
    src: "https://charzanholidays.com/wp-content/uploads/2024/12/Thiksey_Monastery-ladakh_charzan_holidays.jpg",
    title: "Weekend 1",
    subtitle: "Thiksey & Hemis monasteries",
  },
  {
    src: "https://topclassholidays.com/wp-content/uploads/2025/07/Magnetic-Hill-Ladakh.jpg",
    title: "Weekend 2",
    subtitle: "Magnetic Hill & Sangam",
  },
  {
    src: "https://www.eladakhtourism.com/camps-in-nubra/images/paramountcamp.jpg",
    title: "Weekend 3",
    subtitle: "Khardung La Pass",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7IXjTKCvo8hReTEv1x5PrLXbQMsM5ZCfFZA&s",
    title: "Weekend 4",
    subtitle: "Pangong Lake",
  },
];

export default function ScrollGallery() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const progress = useSpring(scrollYProgress);
  const spacing = 260;

  const cards = images.map((_, i) => {
    const offset = i - (images.length - 1) / 2;
    return {
      x: offset * spacing + (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 120,
      rotate: (Math.random() - 0.5) * 12,
      scale: 0.95 + Math.random() * 0.08,
      z: Math.random() * 100,
    };
  });

  // Mobile Layout: Responsive Grid
  if (isMobile) {
    return (
      <section id="gallery" className="bg-[#fefbf7] py-20 px-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
              VIBE GALLERY
            </span>
            <h2 className="text-3xl font-serif font-medium tracking-tight text-stone-900">
              The Spirit of Ladakh
            </h2>
            <p className="mt-2 text-xs text-stone-500 font-sans leading-relaxed max-w-md mx-auto">
              Witness timeless landscapes, sacred traditions, and moments that reconnect you with nature.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {images.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-stone-200 p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-bold text-stone-950 tracking-tight leading-none">{item.title}</h3>
                <p className="text-[10px] font-mono text-[var(--copper)] uppercase tracking-wider mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout: Original 3D Sticky Scroll Gallery
  return (
    <section ref={ref} id="gallery" className="relative h-[350vh] bg-white-100">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 border-b border-dashed border-stone-300 pb-6 pt-10 mb-20 text-center">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-stone-900">
            The Spirit of Ladakh
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-900">
            Witness timeless landscapes, sacred traditions, and moments that reconnect you with nature.
          </p>
        </div>

        {images.map((img, i) => {
          const delay = i * 0.07;
          const x = useTransform(
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
            <MotionImage
              key={i}
              src={img.src}
              alt=""
              width={400}
              height={360}
              unoptimized
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
                opacity: opacity,
                filter: blur,
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
              }}
              className="absolute w-100 h-90 rounded-2xl object-cover shadow-2xl cursor-grab"
            />
          );
        })}
      </div>
    </section>
  );
}
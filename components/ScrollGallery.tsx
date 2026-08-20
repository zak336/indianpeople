"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const MotionImage = motion(Image);

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
}

const images: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop",
    title: "Ladakh",
    subtitle: "High Altitude Escape",
  },
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1470&auto=format&fit=crop",
    title: "Varkala, Kerala",
    subtitle: "Clifftop Coastal Retreat",
  },
  {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1471&auto=format&fit=crop",
    title: "Jaipur, Rajasthan",
    subtitle: "Royal Heritage Workation",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1470&auto=format&fit=crop",
    title: "Manali, Himachal",
    subtitle: "Mountain Valley Focus",
  },
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop",
    title: "Deep Focus Co-Working",
    subtitle: "Ergonomic workstations",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop",
    title: "Nature & Scenery",
    subtitle: "Reconnect with nature",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
    title: "Peer Community",
    subtitle: "Work alongside founders",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
    title: "Private Retreats",
    subtitle: "Curated accommodations",
  },
];

export default function ScrollGallery() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) {
    return <div className="h-screen bg-[#fefbf7]" />;
  }

  return isMobile ? <MobileGallery /> : <DesktopGallery />;
}

function MobileGallery() {
  return (
    <section
      id="gallery"
      className="bg-[#fefbf7] py-20 px-6 border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            VIBE GALLERY
          </span>
          <h2 className="text-3xl font-serif font-medium tracking-tight text-stone-900">
            The Spirit of India
          </h2>
          <p className="mt-2 text-xs text-stone-500 font-sans leading-relaxed max-w-md mx-auto">
            Timeless landscapes, scenic locations, and the energy of India&apos;s most beautiful corners.
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
              <h3 className="text-base font-bold text-stone-950 tracking-tight leading-none">
                {item.title}
              </h3>
              <p className="text-[10px] font-mono text-[var(--copper)] uppercase tracking-wider mt-1">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pre-seeded card offsets so they're stable and don't call Math.random during render
const CARD_OFFSETS = images.map((_, i) => {
  const spacing = 260;
  const offset = i - (images.length - 1) / 2;
  const seed = i * 1.618;
  const pseudo = (n: number) => ((Math.sin(n) * 43758.5453123) % 1 + 1) % 1;
  return {
    x: offset * spacing + (pseudo(seed) - 0.5) * 40,
    y: (pseudo(seed + 1) - 0.5) * 120,
    rotate: (pseudo(seed + 2) - 0.5) * 12,
    scale: 0.95 + pseudo(seed + 3) * 0.08,
  };
});

function DesktopGallery() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const progress = useSpring(scrollYProgress);
  const cards = CARD_OFFSETS;

  return (
    <section ref={ref} id="gallery" className="relative h-[350vh] bg-[#fefbf7]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 border-b border-dashed border-stone-300 pb-6 pt-10 mb-20 text-center w-full px-6">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-stone-900 font-serif">
            The Spirit of India
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-500">
            Drag the cards · Explore our locations
          </p>
        </div>

        {images.map((img, i) => (
          <DesktopCard
            key={i}
            img={img}
            index={i}
            progress={progress}
            cardConfig={cards[i]}
          />
        ))}
      </div>
    </section>
  );
}

interface DesktopCardProps {
  img: GalleryItem;
  index: number;
  progress: MotionValue<number>;
  cardConfig: { x: number; y: number; rotate: number; scale: number };
}

function DesktopCard({ img, index, progress, cardConfig }: DesktopCardProps) {
  const delay = index * 0.07;

  const x = useTransform(
    progress,
    [0, 0.85, 1],
    [0, cardConfig.x * 1.08, cardConfig.x],
  );

  const y = useTransform(progress, [0, 1], [0, cardConfig.y]);
  const rotate = useTransform(progress, [0, 1], [0, cardConfig.rotate]);
  const scale = useTransform(progress, [0, 0.6, 1], [0.85, 1.05, cardConfig.scale]);
  const opacity = useTransform(progress, [delay, delay + 0.15], [0, 1]);
  const blur = useTransform(progress, [0, 0.25], ["8px", "0px"]);

  return (
    <MotionImage
      src={img.src}
      alt={img.title}
      width={400}
      height={360}
      unoptimized
      drag
      dragElastic={0.15}
      whileHover={{ scale: 1.08, zIndex: 100 }}
      style={{
        x, y, rotate, scale, opacity,
        filter: blur,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="absolute w-100 h-90 rounded-2xl object-cover shadow-2xl cursor-grab"
    />
  );
}

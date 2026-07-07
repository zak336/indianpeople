import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const MotionImage = motion(Image);

const programs = [
  {
    day: "STEP 01",
    title: "1. Reserve Seat",
    description:
      "Secure your place with a ₹25,000 deposit. Fully refundable up to 30 days before cohort start.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    day: "STEP 02",
    title: "2. Match Cohort",
    description:
      "Get matched to cohort dates and confirm your defined deliverable/goal. We align squads around clear shipped targets.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1468&auto=format&fit=crop"
  },
  {
    day: "STEP 03",
    title: "3. Arrive & Focus",
    description:
      "Arrive in Ladakh. Your infrastructure, single-occupancy workspace, private room, and meals are handled from day one.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1421&auto=format&fit=crop"
    },
    {
      day: "STEP 04",
      title: "4. Ship & Leave",
      description:
        "Focus entirely on your deliverable with zero distraction. Leave on day 14 with your milestone fully shipped.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
    },
];

export default function Programs() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
const introOpacity =useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const timelineOpacity = useTransform(
  scrollYProgress,
  [0.12, 0.2],
  [0, 1]
);
const step = useTransform(
  scrollYProgress,
  [0.25, 0.5, 0.75, 1],
  [0, -1, -2, -3]
);
const timelineX = useTransform(
  step,
  (v) => `${v * 40}vw`
);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

useMotionValueEvent(scrollYProgress, "change", (latest) => {
  if (latest < 0.45) {
    setActiveIndex(0);
  } else if (latest < 0.65) {
    setActiveIndex(1);
  } else if (latest < 0.9) {
    setActiveIndex(2);
  } else {
    setActiveIndex(3);
  }
});
const introY = useTransform(
  scrollYProgress,
  [0, 0.15],
  [0, -30]
);

  // Entire timeline moves horizontally


  return (
    <div
      ref={ref}
      id="programs"
      className="relative h-[500vh] bg-[var(--copper)] text-white"
    >
  <section className="sticky top-0 h-screen overflow-hidden ">

  <div className="grid h-full grid-cols-1 md:grid-cols-12">

    {/* LEFT SIDE */}
    <motion.div
      className="col-span-1 md:col-span-4 flex items-center px-6 sm:px-12 md:px-16 bg-white/[0.08] backdrop-blur-2xl border-b md:border-r border-white/15 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.5)] pt-12 pb-8 md:py-20"
    >
      <motion.div className="max-w-md"       style={{
        y: isMobile ? 0 : introY,
      }}>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-copper">
          THE WORKFLOW
        </p>

        <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight text-white">
        Built for execution — not tourism.
        </h2>

        <p className="mt-4 md:mt-8 text-xs sm:text-sm md:text-base font-sans leading-relaxed text-zinc-300">
          Four simple stages to reserve, align, arrive, and ship. We handle 100% of your logistical surface area so that your output is the only variable left.
        </p>
      </motion.div>
    </motion.div>

<div className="relative col-span-1 md:col-span-8 overflow-hidden bg-white min-h-[50vh] md:min-h-0">

  {/* Background Image */}
  <MotionImage
    key={activeIndex}
    src={programs[activeIndex].image}
    alt={`${programs[activeIndex].title} - ${programs[activeIndex].description}`}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7 }}
    fill
    unoptimized
    className="object-cover"
    sizes="50vw"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 z-0" />

  {/* Timeline Line */}
  <div className="absolute top-12 left-0 right-0 h-px bg-white/40 z-10" />

  {/* Timeline */}
  <motion.div
    style={{ x: timelineX }}
    className="relative z-20 flex items-start gap-6 md:gap-12 pl-[8vw] md:pl-[20vw] pt-5"
  >
    {programs.map((item, index) => (
      <div
        key={index}
        className="w-[72vw] sm:w-[50vw] md:w-[34vw] shrink-0"
      >
        {/* Timeline Marker */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <div className="h-5 w-5 rounded-full bg-orange-300" />
          </div>
        </div>

        {/* Card */}
        <motion.div
          className="rounded-xl bg-white p-6 md:p-10 text-zinc-900 shadow-2xl"
          animate={{
            scale: activeIndex === index ? 1.05 : 0.95,
            opacity: activeIndex === index ? 1 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <p className="text-sm md:text-xl font-bold uppercase tracking-[0.35em] text-[var(--copper)]">
            {item.day}
          </p>

          <h2 className="mt-2 md:mt-4 text-xl md:text-3xl font-semibold">
            {item.title}
          </h2>

          <p className="mt-3 md:mt-6 text-xs md:text-lg leading-relaxed text-zinc-700">
            {item.description}
          </p>
        </motion.div>
      </div>
    ))}
  </motion.div>

</div>
  </div>

</section>
    </div>
  );
}
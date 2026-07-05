import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const programs = [
  {
    day: "DAY 01–05",
    title: "Execution Block 01",
    description:
      "Structured focus blocks. Teams define their milestone on day one and execute toward it daily.",
  },
  {
    day: "DAY 06–10",
    title: "Execution Block 02",
    description:
      "Daily mentor reviews, accountability checkpoints and focused execution sessions.",
  },
  {
    day: "DAY 11–15",
    title: "Execution Block 03",
    description:
      "Customer conversations, product iteration and rapid feedback cycles to validate ideas.",
  },
  {
    day: "DAY 16–20",
    title: "Execution Block 04",
    description:
      "Final sprint, demo preparation and roadmap planning for the next phase of growth.",
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
      className="relative h-[500vh] bg-[var(--copper)] text-white"
    >
  <section className="sticky top-0 h-screen overflow-hidden ">

  <div className="grid h-full grid-cols-12">

    {/* LEFT SIDE */}
    <motion.div

      className="col-span-4 flex items-center px-16 bg-orange-700/50 pt-20"
    >
      <motion.div className="max-w-md"       style={{
        y: introY,
      }}>
        <p className="font-bold uppercase tracking-[0.3em] ">
          PROGRAM
        </p>

        <h2 className="mt-6 text-5xl font-semibold leading-tight">
        built for output — not itinerary.
        </h2>

        <p className="mt-8 text-2xl leading-8 text-white">
          A fixed execution window for early-stage founding teams.
          Commercial-grade internet, redundant power and ergonomic
          workstations engineered for uninterrupted focus.
        </p>
      </motion.div>
    </motion.div>

<div className="relative col-span-8 overflow-hidden bg-orange-300">

  {/* Continuous timeline */}
  <div className="absolute top-12 left-0 right-0 h-px bg-white z-0" />

  <motion.div
    style={{ x: timelineX }}
    className="relative z-10 flex items-start gap-12 pl-[20vw] pt-5"
  >
    {programs.map((item, index) => (
      <div
        key={index}
        className="w-[34vw] shrink-0"
      >
        {/* Timeline marker */}
        <div className="flex justify-center mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            < div className="bg-orange-400 w-5 h-5 rounded-full " />
          </div>
        </div>

        {/* Card */}
        <motion.div
          className="rounded-xl bg-white p-10 text-zinc-900 shadow-lg"
          animate={{
            scale: activeIndex === index ? 1.08 : 0.95,
            opacity: activeIndex === index ? 1 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <p className="text-xl font-bold uppercase tracking-[0.35em] text-[var(--copper)]">
            {item.day}
          </p>

          <h2 className="mt-4 text-3xl font-semibold">
            {item.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-700">
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
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

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
const introY = useTransform(
  scrollYProgress,
  [0, 0.15],
  [0, -30]
);
const step = useTransform(
  scrollYProgress,
  [0.25, 0.5, 0.75, 1],
  [0, -1, -2, -3]
);
  // Entire timeline moves horizontally
const timelineX = useTransform(
  step,
  (v) => `${v * 40}vw`
);

  return (
    <div
      ref={ref}
      className="relative h-[500vh] bg-zinc-950 text-white"
    >
  <section className="sticky top-0 h-screen overflow-hidden ">

  <div className="grid h-full grid-cols-12">

    {/* LEFT SIDE */}
    <motion.div
      style={{
        y: introY,
      }}
      className="col-span-4 flex items-center px-16 border-r border-zinc-800  pt-20"
    >
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--copper)]">
          PROGRAM
        </p>

        <h2 className="mt-6 text-5xl font-semibold leading-tight">
        built for output — not itinerary.
        </h2>

        <p className="mt-8 text-lg leading-8 text-zinc-400">
          A fixed execution window for early-stage founding teams.
          Commercial-grade internet, redundant power and ergonomic
          workstations engineered for uninterrupted focus.
        </p>
      </div>
    </motion.div>

    {/* RIGHT SIDE */}
<div className="relative col-span-8 overflow-hidden flex items-center">
      <motion.div
        style={{x: timelineX }}
        className="flex items-center gap-12 pl-[20vw]"
      >
        {programs.map((item, index) => (
          <div
            key={index}
className="w-[34vw] shrink-0 snap-center"          >
            <div className="max-w-lg ">

              {/* Timeline */}
              <div className="flex items-center mb-10 ">

                <div className="flex-1 h-px bg-zinc-800" />

                <div className="mx-5 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--copper)] bg-zinc-950">
                  <ChevronRight
                    className="text-[var(--copper)]"
                    size={20}
                  />
                </div>

                <div className="flex-1 h-px bg-zinc-800" />

              </div>

              {/* Card */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-10">

                <p className="text-xs uppercase tracking-[0.35em] text-[var(--copper)]">
                  {item.day}
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  {item.title}
                </h2>

                <p className="mt-6 text-lg leading-8 text-zinc-400">
                  {item.description}
                </p>

              </div>

            </div>
          </div>
        ))}
      </motion.div>

    </div>

  </div>

</section>
    </div>
  );
}
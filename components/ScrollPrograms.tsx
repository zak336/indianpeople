import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const programs = [
  {
    day: "DAY 01–05",
    title: "Execution Block 01",
    description:
      "Structured focus blocks. Teams define their milestone on day one and execute toward it daily.",
    image: "https://images.openai.com/static-rsc-4/O-nqHq_UQvFLn_E9SpINR1UsJogYh31CtLbQAsJNxevpS4ydxTmUd3D3qL0Q1D1Q4PtI3yzWKgkp6-l0i2e3SeDNDeZuI43TDJvdgehz1HZ2Gctv8kaB4mw8vemoCOVkl0djy7X57fmaAtuD64q7SLjdhVFVdjfDQKF0yzMX4oQ?purpose=inline"
  },
  {
    day: "DAY 06–10",
    title: "Execution Block 02",
    description:
      "Daily mentor reviews, accountability checkpoints and focused execution sessions.",
    image: "https://images.openai.com/static-rsc-4/niNs8Bia8HL_gnszWIEA-ORyEveViA4oRZPhDm4gNrBPbc4TEAYqG6p198Lih0DalHIEHmIL8sjSneiWwb6eheOV81C0BfhtnAok1-5YnyjXScGu-7KQr-LK3TjHUicxK_743sgGREobIS6NFk8XZaB8GSO31sqXmJFEpaf0ysxLLrqlOp8A5w5xtwmvMzjB?purpose=fullsize"
  },
  {
    day: "DAY 11–15",
    title: "Execution Block 03",
    description:
      "Customer conversations, product iteration and rapid feedback cycles to validate ideas.",
      image: "https://images.openai.com/static-rsc-4/5VVr8VBHeDlw7OSzUhJ6HfXL6ghiOjolCoyBpfqEDRWMV4bhuobtjebh81dew9ug9AlLfnOri6zj6zgKfllmS0lHSi2EGUPrXaG_VfZeP_fQoGTjxSRmOei7Svm-i7Zitzrhn9xxtXqIfXgc76Z85vv3f-2tfaXCzA_fDIT2ulPQZKCqIFjsyYrOubMCxbW3?purpose=fullsize"
    },
    {
      day: "DAY 16–20",
      title: "Execution Block 04",
      description:
      "Final sprint, demo preparation and roadmap planning for the next phase of growth.",
      image:"https://images.openai.com/static-rsc-4/TzYJ9XzExkMHkuzlRirZrJlxJOZUpeiJc4_IYkLEMIJoQfkQppDjoC4-vUrHNDbnOCtDrAl_b-wQTIRQt8CoGlcwo3g-NgcfAfNsjg1DX-F4uZUFmRO_jen4wLZuvN1n60NHqdgcGmzght3Ri7rPHVGHtDsVV3DuI2NHmgrEjpk?purpose=inline"
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

<div className="relative col-span-8 overflow-hidden bg-white">

  {/* Background Image */}
  <motion.img
    key={activeIndex}
    src={programs[activeIndex].image}
    alt={`${programs[activeIndex].title} - ${programs[activeIndex].description}`}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7 }}
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 z-0" />

  {/* Timeline Line */}
  <div className="absolute top-12 left-0 right-0 h-px bg-white/40 z-10" />

  {/* Timeline */}
  <motion.div
    style={{ x: timelineX }}
    className="relative z-20 flex items-start gap-12 pl-[20vw] pt-5"
  >
    {programs.map((item, index) => (
      <div
        key={index}
        className="w-[34vw] shrink-0"
      >
        {/* Timeline Marker */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <div className="h-5 w-5 rounded-full bg-orange-300" />
          </div>
        </div>

        {/* Card */}
        <motion.div
          className="rounded-xl bg-white p-10 text-zinc-900 shadow-2xl"
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
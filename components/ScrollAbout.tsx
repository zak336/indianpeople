import {
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Thermometer,
  Droplets,
  Mountain,
} from "lucide-react";
export default function About() {
  const ref = useRef(null);
  const hasStarted = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [timer, setTimer] = useState(0);

  // -----------------------------
  // Timeline Phases
  // -----------------------------
  const intro = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const forest = useTransform(scrollYProgress, [0.15, 0.7], [0, 0.75]);
  const outro = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  // -----------------------------
  // Heading
  // -----------------------------
  const headingY = useSpring(
    useTransform(intro, [0, 1], [0, -80]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  const headingOpacity = useSpring(
    useTransform(outro, [0, 1], [1, 0.8]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  const headingScale = useSpring(
    useTransform(outro, [0, 1], [1, 0.9]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  // -----------------------------
  // Forest
  // -----------------------------
  const leftForestScale = useSpring(
    useTransform(forest, [0, 1], [1.35, 0.7]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  const rightForestScale = useSpring(
    useTransform(forest, [0, 1], [1.15, 0.7]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  const leftForestX = useSpring(
    useTransform(forest, [0, 1], [0, -120]),
    {
      stiffness: 90,
      damping: 20,
    }
  );

  // -----------------------------
  // Timer Animation
  // -----------------------------
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.02 && !hasStarted.current) {
      hasStarted.current = true;

      animate(0, 14, {
        duration: 3,
        onUpdate(value) {
          setTimer(Math.round(value));
        },
      });
    }
  });

  return (
    <div ref={ref} className="relative h-[350vh]">
      <section className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="absolute p-20 left-0 top-0">
          <motion.div className="h-30 w-30 rounded-full bg-orange-400"
          style={{scale: sunScale, opacity: headingOpacity}} >
          </motion.div>
        </div>
        <div className="absolute left-10 bottom-10 z-30">
  <div className="rounded-3xl border border-orange-400/20 bg-orange-800/30 backdrop-blur-xl px-8 py-6 shadow-2xl">

    <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/70">
      Live Conditions
    </p>

    <div className="grid grid-cols-3 gap-8">

      {/* Altitude */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-white/70">
          <Mountain size={18} />
          <span className="text-sm">Altitude</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold text-white">
            3,524m
          </p>

          <ArrowUpRight
            size={18}
            className="text-green-400"
          />
        </div>
      </div>

      {/* Temperature */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-white/70">
          <Thermometer size={18} />
          <span className="text-sm">Temperature</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold text-white">
            14°C
          </p>

          <ArrowUpRight
            size={18}
            className="text-orange-300"
          />
        </div>
      </div>

      {/* Humidity */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-white/70">
          <Droplets size={18} />
          <span className="text-sm">Humidity</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold text-white">
            32%
          </p>

          <ArrowUpRight
            size={18}
            className="text-cyan-300"
          />
        </div>
      </div>

    </div>
  </div>
</div>
        <div className="">
        <motion.img
        style={{
          y: headingY,
        }}
          className="absolute top-0 left-0 bottom-0 right-0 z-10 h-[100vh] w-full"
          alt="Mountain range panoramic landscape in Leh, Ladakh"
          src="/assets/mountain.png"
/>
<div className="absolute  left-0 bottom-0 w-full h-[25vh] bg-[#313b16]" />
        </div>
        {/* Heading */}
        <motion.div
          className="absolute inset-0  flex items-center justify-center z-10"
          style={{
            y: headingY,
            opacity: headingOpacity,
            scale: headingScale,
          }}
        >
          <div className="text-center max-w-4xl">
            <div className="flex items-end justify-center gap-2">
              <h2 className="text-8xl font-bold text-green-800">
                {timer}
              </h2>

              <span className="text-7xl">
                days.
              </span>
            </div>

            <p className="mt-6 text-7xl">
              Zero infrastructure risk.
            </p>

            <p className="text-7xl">
              One shipped milestone.
            </p>
          </div>
        </motion.div>

        {/* Forest */}
        <div className="absolute inset-0 z-10 pointer-events-none">

          {/* Left */}
          <motion.img
            src="/assets/forest.png"
            alt="Forest silhouette landscape in Ladakh mountains"
            className="absolute bottom-[-15%] left-[-10%] h-full w-auto object-contain"
            style={{
              scale: leftForestScale,
              x: leftForestX,
              scaleX: -1,
              opacity: 1,
            }}
          />

          {/* Right */}
          <motion.img
            src="/assets/forest.png"
            alt="Forest landscape at high altitude in Ladakh"
            className="absolute bottom-0 right-0 h-full w-auto object-contain origin-bottom-right"
            style={{
              scale: rightForestScale,
              opacity: 1,
            }}
          />
        </div>
      </section>
    </div>
  );
}
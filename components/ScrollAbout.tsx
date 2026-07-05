import {
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

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
        {/* Heading */}
        <motion.div
          className="absolute inset-0  flex items-center justify-center"
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
            className="absolute bottom-[-15%] left-[-10%] h-full w-auto object-contain"
            style={{
              scale: leftForestScale,
              x: leftForestX,
              scaleX: -1,
              opacity: headingOpacity,
            }}
          />

          {/* Right */}
          <motion.img
            src="/assets/forest.png"
            className="absolute bottom-0 right-0 h-full w-auto object-contain origin-bottom-right"
            style={{
              scale: rightForestScale,
              opacity: headingOpacity,
            }}
          />
        </div>
      </section>
    </div>
  );
}
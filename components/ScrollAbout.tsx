import { animate, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";


export default function About() {
    const ref = useRef(null);
    const hasStarted = useRef(false);

    const {scrollYProgress} = useScroll({
        target:ref, 
        offset:["start start", "end end"]
    });
    const [timer, setTime] = useState(0);
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if(latest > .01  && !hasStarted.current){
            hasStarted.current = true;
            animate(0, 14, {
                duration:3,
                onUpdate(vlaue) {
                    setTime(Math.round(vlaue));
                },
            });
        }
    })

    return (<>
  <div ref={ref} className="relative h-[200vh]">
  <section className="sticky top-0 h-screen relative overflow-hidden">
    <motion.div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center max-w-4xl">
        <motion.div style={{y}} className="Heading">

        <div className="flex items-end justify-center gap-2" >
          <h2   className="text-8xl font-bold text-green-800">
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
        </motion.div>
   
      </div>

    </motion.div>
  </section>
</div> </>);
}
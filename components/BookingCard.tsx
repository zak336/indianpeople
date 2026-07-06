"use client";

import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Item {
title: any,
value: any,
subtitle: any,
progress: any,
start: any
}
function ReceiptRow({ title, value, subtitle, progress, start }: Item) {
  const x = useTransform(progress, [start, start + 0.12], [-120, 0]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="border-b border-dashed border-stone-300 py-5 flex justify-between items-center px-6"
    >
        <div className="flex flex-col gap-1 text-zinc-800">
      <p className="text-[11px] uppercase tracking-[0.25em] text-stone-800">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 text-sm text-stone-500">
          {subtitle}
        </p>
      )}
        </div>
      <h3 className="mt-2 text-lg font-semibold text-stone-900">
        {value}
      </h3>
    </motion.div>
  );
}

export default function ExpeditionReceipt() {
  const receiptRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: receiptRef,
    offset: ["start 75%", "end 20%"],
  });

const [price, setPrice] = useState(0);

useMotionValueEvent(scrollYProgress, "change", (latest) => {
  let total = 0;

  // Seats Reserved
  if (latest >= 0.37) total += 5000;

  // Location
  if (latest >= 0.47) total += 5000;

  // Dates
  if (latest >= 0.57) total += 7500;

  // Duration
  if (latest >= 0.67) total += 7500;

  setPrice(total);
});
  const buttonX = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
<section ref={receiptRef} className="relative h-[350vh]">
  <motion.div className="sticky top-0 h-screen w-full max-w-2xl mx-auto bg-white">
        {/* Header */}
        <div className="border-b border-dashed border-stone-300 pb-6 pt-10 mb-20 text-center">
          <h1 className="text-3xl font-bold tracking-[0.3em] text-stone-900">
            EXPEDITION
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.4em] text-stone-500">
            Reservation Receipt
          </p>
        </div>

        {/* Receipt Body */}

        <ReceiptRow
          title="Seats Reserved"
          value="6 of 15 seats reserved"
          subtitle="Cohort locks when full"
          progress={scrollYProgress}
          start={0.25}
        />

        <ReceiptRow
          title="Location"
          value="Leh, Ladakh"
          subtitle="34.1526°N, 77.5771°E"
          progress={scrollYProgress}
          start={0.35}
        />

        <ReceiptRow
                  title="Dates"
                  value="10th August – 24th August"
                  progress={scrollYProgress}
                  start={0.45} subtitle={undefined}        />

        <ReceiptRow
                  title="Duration"
                  value="14-day program"
                  progress={scrollYProgress}
                  start={0.55} subtitle={undefined}        />


        {/* Footer */}

        <motion.div
          style={{
            x: buttonX,
          }}
          className="pt-8 mb-7"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
            To Reserve Today
          </p>

          <div className="mt-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-stone-900">
  ₹{price.toLocaleString("en-IN")}
</h2>

            <button className="rounded-full cursor-pointer bg-[var(--copper)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--copper-dark)]">
              Reserve Seat
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



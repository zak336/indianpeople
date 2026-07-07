"use client";

import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

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

  // The Math calculation
  if (latest >= 0.37) total += 15000;

  // Workspace
  if (latest >= 0.47) total += 15000;

  // Meals & Operations
  if (latest >= 0.57) total += 20000;

  // Redundant Fiber
  if (latest >= 0.67) total += 20000;

  setPrice(total);
});
  const buttonX = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
<section ref={receiptRef} id="booking" className="relative h-[350vh]">
  <motion.div className="sticky top-0 h-screen w-full max-w-2xl mx-auto bg-white flex flex-col justify-center px-8">
        {/* Header */}
        <div className="border-b border-dashed border-stone-300 pb-6 pt-10 mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-[0.3em] text-stone-900 font-serif">
            THE MATH
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500 max-w-md mx-auto">
            ₹70,000 for 14 days = ₹5,000/day. Less than one night at a Bangalore corporate offsite.
          </p>
        </div>

        {/* Receipt Body */}

        <ReceiptRow
          title="Duration"
          value="14-Day Sprint"
          subtitle="Zero itinerary. Zero 'team bonding' noise."
          progress={scrollYProgress}
          start={0.25}
        />

        <ReceiptRow
          title="Villa & Workspace"
          value="Private Single-Occupancy"
          subtitle="Sanctuary designed for absolute deep focus."
          progress={scrollYProgress}
          start={0.35}
        />

        <ReceiptRow
          title="Meals & Operations"
          value="All Inclusive"
          subtitle="Zero operational burn and decision fatigue."
          progress={scrollYProgress}
          start={0.45}       
        />

        <ReceiptRow
          title="Uptime SLA"
          value="Dual-WAN Redundant Fiber"
          subtitle="Zero internet downtime, tested 99.9% uptime."
          progress={scrollYProgress}
          start={0.55}       
        />

        {/* Included / Not Included Lists */}
        <div className="grid grid-cols-2 gap-6 my-6 border-t border-stone-200 pt-6 text-[11px] font-sans">
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">Included</h4>
            <ul className="space-y-1 text-zinc-600">
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Private airport transfers</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Private transportation</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Private Ensuite Room</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> All meals handled daily</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Redundant Fiber internet</li>
              <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Weekend decompression trips</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">Not Included</h4>
            <ul className="space-y-1 text-zinc-600">
              <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Flights (Leh)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Visa / Permits</li>
              <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Travel Insurance</li>
              <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Outside personal expenses</li>
            </ul>
          </div>
        </div>

        {/* Footer */}

        <motion.div
          style={{
            x: buttonX,
          }}
          className="pt-8 mb-7"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
            Total Burn (Comparable to Rent + Food + WeWork)
          </p>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-4xl font-bold text-stone-900 font-serif">
              ₹{price.toLocaleString("en-IN")}
            </h2>

            <Link href="/checkout">
              <button className="rounded-full cursor-pointer bg-[var(--copper)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--copper-dark)]">
                Reserve Seat — ₹25,000 Deposit
              </button>
            </Link>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center mt-6">
            Fully refundable up to 30 days before cohort start.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}


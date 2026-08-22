"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

interface Item {
  title: string;
  value: string;
  subtitle: string | null;
  progress: MotionValue<number>;
  start: number;
}

function ReceiptRow({ title, value, subtitle, progress, start }: Item) {
  const x = useTransform(progress, [start, start + 0.12], [-120, 0]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="border-b border-dashed border-stone-300 py-3 md:py-4 flex justify-between items-center px-4 md:px-6"
    >
      <div className="flex flex-col gap-0.5 text-zinc-800">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-stone-800">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs md:text-sm text-stone-500">{subtitle}</p>
        )}
      </div>
      <h3 className="text-base md:text-lg font-semibold text-stone-900">
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
    if (latest >= 0.37) total += 20000; // Accommodation
    if (latest >= 0.47) total += 20000; // Co-working
    if (latest >= 0.57) total += 20000; // Meals & Ops
    if (latest >= 0.67) total += 19999; // Internet & Transfers
    setPrice(total);
  });

  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={receiptRef} id="booking" className="relative h-[350vh]">
      <motion.div className="sticky top-0 h-screen w-full max-w-2xl mx-auto bg-white flex flex-col justify-center px-4 md:px-8">
        {/* Header */}
        <div className="border-b border-dashed border-stone-300 pb-3 md:pb-5 pt-6 md:pt-8 mb-4 md:mb-6 text-center">
          <h2 className="text-3xl font-bold tracking-[0.3em] text-stone-900 font-serif">
            THE VALUE
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500 max-w-md mx-auto">
            ₹79,999 for 14 days = ₹5,714/day. Less than rent + food + WeWork in
            any Indian metro.
          </p>
        </div>

        {/* Receipt Body */}
        <ReceiptRow
          title="Accommodation"
          value="Private Ensuite Room"
          subtitle="14 nights at a scenic property."
          progress={scrollYProgress}
          start={0.25}
        />
        <ReceiptRow
          title="Co-Working Space"
          value="Dedicated Ergonomic Desk"
          subtitle="Productivity-engineered workspace."
          progress={scrollYProgress}
          start={0.35}
        />
        <ReceiptRow
          title="All Meals & Operations"
          value="All Inclusive"
          subtitle="Breakfast, lunch & dinner — zero friction."
          progress={scrollYProgress}
          start={0.45}
        />
        <ReceiptRow
          title="Internet & Transfers"
          value="Redundant High-Speed"
          subtitle="99.9% uptime + airport pickup & drop."
          progress={scrollYProgress}
          start={0.55}
        />

        {/* Included / Not Included */}
        <div className="grid grid-cols-2 gap-4 my-4 md:my-5 border-t border-stone-200 pt-4 md:pt-5 text-[10px] font-sans">
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Included
            </h4>
            <ul className="space-y-1 text-zinc-600">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> Airport / station
                transfers
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> Private ensuite room
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> All daily meals
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> Ergonomic co-working
                desk
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> Weekend exploration
                trips
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span> Community peer
                access
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Not Included
            </h4>
            <ul className="space-y-1 text-zinc-600">
              <li className="flex items-center gap-1.5">
                <span className="text-red-500">✕</span> Flights / train tickets
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-red-500">✕</span> Travel insurance
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-red-500">✕</span> Outside personal
                expenses
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-red-500">✕</span> Room upgrade (optional
                +₹20k)
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-4 mb-4 border border-stone-200 rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left text-[10px] md:text-xs font-sans">
            <thead className="bg-stone-50">
              <tr className="border-b border-stone-200 text-zinc-500 font-mono tracking-wider">
                <th className="py-2 px-3 font-bold uppercase">
                  Expense (14 Days)
                </th>
                <th className="py-2 px-3 font-bold uppercase">
                  Bangalore / Gurgaon
                </th>
                <th className="py-2 px-3 font-bold uppercase text-right">
                  Sync Retreat
                </th>
              </tr>
            </thead>
            <tbody className="text-zinc-800">
              <tr className="border-b border-stone-100">
                <td className="py-1.5 px-3 text-zinc-600">Rent & Utilities</td>
                <td className="py-1.5 px-3 font-mono text-zinc-500">
                  ₹20,000+
                </td>
                <td className="py-1.5 px-3 text-right font-medium text-emerald-600">
                  Included
                </td>
              </tr>
              <tr className="border-b border-stone-100">
                <td className="py-1.5 px-3 text-zinc-600">Food & Coffee</td>
                <td className="py-1.5 px-3 font-mono text-zinc-500">
                  ₹15,000+
                </td>
                <td className="py-1.5 px-3 text-right font-medium text-emerald-600">
                  Included
                </td>
              </tr>
              <tr className="border-b border-stone-100">
                <td className="py-1.5 px-3 text-zinc-600">
                  WeWork / Co-Working
                </td>
                <td className="py-1.5 px-3 font-mono text-zinc-500">
                  ₹10,000+
                </td>
                <td className="py-1.5 px-3 text-right font-medium text-emerald-600">
                  Included
                </td>
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-2 px-3 font-bold text-zinc-900 uppercase tracking-wider">
                  Total Output
                </td>
                <td className="py-2 px-3 font-bold text-zinc-900">
                  ₹45,000+ & Burnout
                </td>
                <td className="py-2 px-3 text-right font-bold text-(--copper)">
                  ₹79,999 & Max Output
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer CTA */}
        <motion.div
          style={{ opacity: buttonOpacity }}
          className="pt-2 md:pt-4 mb-4 md:mb-6"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
            14-Day Workation · All Inclusive
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-stone-900 font-serif">
                ₹{price > 0 ? price.toLocaleString("en-IN") : "79,999"}
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Total · per person
              </p>
            </div>
            <Link href="/checkout">
              <button className="rounded-full cursor-pointer bg-(--copper) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--copper-dark) shadow-lg shadow-(--copper)/20">
                Book — ₹29,999 Deposit
              </button>
            </Link>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center mt-6">
            Fully refundable up to 30 days before retreat start.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

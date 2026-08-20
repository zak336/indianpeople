"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const retreatDates = [
  "Oct 19", "Nov 2", "Nov 16", "Nov 30",
  "Dec 14", "Dec 28", "Jan 11", "Jan 25", "Feb 8"
];

export default function Scheduler() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"7day" | "14day">("14day");

  const plans = [
    { id: "7day", label: "7-Day Tourist Plan", duration: "7 days", price: "₹79,999" },
    { id: "14day", label: "14-Day Workation", duration: "14 days", price: "₹79,999" },
  ] as const;

  const getEndDate = (startIdx: number, plan: "7day" | "14day") => {
    const starts = [
      { m: 9, d: 19, y: 2026 }, { m: 10, d: 2, y: 2026 },
      { m: 10, d: 16, y: 2026 }, { m: 10, d: 30, y: 2026 },
      { m: 11, d: 14, y: 2026 }, { m: 11, d: 28, y: 2026 },
      { m: 0, d: 11, y: 2027 }, { m: 0, d: 25, y: 2027 },
      { m: 1, d: 8, y: 2027 },
    ];
    const s = starts[startIdx];
    const date = new Date(s.y, s.m, s.d);
    date.setDate(date.getDate() + (plan === "7day" ? 7 : 14));
    return {
      formatted: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      year: date.getFullYear()
    };
  };

  const documents = [
    { title: "Workation Guide & Pre-Arrival Checklist", file: "SyncRetreat_Deployment_Manifest.pdf" },
    { title: "Pricing Schedule & Invoice Details", file: "payment.pdf" },
    { title: "What to Expect & Community Overview", file: "SyncRetreat_Alignment_Protocol.pdf" },
  ];

  return (
    <section id="scheduler" className="bg-[#fefbf7] text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            RETREAT SCHEDULE · 2026–27
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
            Choose Your Date
          </h2>
          <p className="mt-3 text-zinc-500 font-sans text-sm max-w-xl">
            All retreats run across India&apos;s most scenic locations. Same dates apply to both 7-day and 14-day plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">

          {/* Left: Date + Plan Selector */}
          <div>
            {/* Plan toggle */}
            <div className="flex gap-2 mb-8 bg-white border border-stone-200 rounded-2xl p-1.5 w-fit shadow-sm">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedPlan === plan.id
                      ? "bg-[var(--copper)] text-white shadow-md"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>

            {/* Upcoming retreat badge */}
            <div className="flex items-center gap-2 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin size={12} />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                Next Up: Varkala, Kerala
              </span>
            </div>

            {/* Date grid */}
            <div className="bg-white border border-stone-200 shadow-md rounded-3xl p-6 md:p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-5">
                Select start date — {selectedPlan === "7day" ? "7" : "14"} days from selected date
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {retreatDates.map((date, idx) => {
                  const isSelected = selectedDate === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(idx)}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-[var(--copper)] bg-[var(--copper)]/8 shadow-md"
                          : "border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <p className="text-[10px] font-mono text-zinc-400 uppercase mb-1">Start</p>
                      <p className="text-sm font-bold text-zinc-900">{date}</p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        → {getEndDate(idx, selectedPlan).formatted}
                      </p>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--copper)] text-white flex items-center justify-center">
                          <Check size={11} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 pt-6 flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Selected</p>
                  <p className="text-lg font-serif font-bold text-zinc-900">
                    {retreatDates[selectedDate]} — {getEndDate(selectedDate, selectedPlan).formatted}, {getEndDate(selectedDate, selectedPlan).year}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {plans.find(p => p.id === selectedPlan)?.label} · {plans.find(p => p.id === selectedPlan)?.price}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  Available
                </span>
              </div>

              <Link
                href="/checkout"
                style={{ background: "var(--copper)" }}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-white font-sans font-bold uppercase tracking-wide cursor-pointer shadow-lg shadow-[var(--copper)]/20 hover:shadow-[var(--copper)]/40 hover:scale-[1.02] transition-all text-center text-sm"
              >
                <Calendar size={16} />
                <span>Book This Date — ₹29,999 Deposit</span>
              </Link>
              <p className="text-[10px] font-mono text-zinc-400 text-center mt-3 uppercase tracking-wider">
                Fully refundable up to 30 days before retreat start
              </p>
            </div>
          </div>

          {/* Right: Documents */}
          <div>
            <div className="mb-10">
              <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
                RESOURCES
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Before You Arrive
              </h2>
            </div>

            <div className="bg-white border border-stone-200 shadow-md rounded-3xl p-6 md:p-8 space-y-4 mb-8">
              {documents.map((doc, idx) => (
                <a
                  key={idx}
                  href={`/documents/${doc.file}`}
                  download
                  className="flex items-center justify-between w-full bg-stone-50 hover:bg-[var(--copper)]/5 border border-stone-200 hover:border-[var(--copper)]/30 text-zinc-800 font-sans font-bold py-4 px-6 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <span className="text-xs md:text-sm text-left leading-normal">{doc.title}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[var(--copper)] shrink-0 transition-colors" />
                </a>
              ))}
            </div>

            {/* Enterprise teaser */}
            <div className="bg-[var(--basalt)] text-white rounded-3xl p-8">
              <span className="text-xs font-mono tracking-[0.3em] text-[var(--copper-light)] uppercase block mb-3">
                CORPORATE & TEAMS
              </span>
              <h3 className="text-xl font-serif font-bold mb-2">Planning a Team Offsite?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Custom dates, dedicated spaces, and enterprise pricing for teams of 5+. We handle everything.
              </p>
              <a
                href="mailto:contact@syncretreat.com"
                className="inline-flex items-center gap-2 bg-[var(--copper)] text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[var(--copper-dark)] transition-colors"
              >
                Get Enterprise Quote
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

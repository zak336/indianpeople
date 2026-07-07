"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Check } from "lucide-react";
import Link from "next/link";

export default function Scheduler() {
  const [selectedCohort, setSelectedCohort] = useState(0);

  const cohorts = [
    {
      num: "01",
      start: "JULY 06",
      end: "JULY 27",
      status: "AVAILABLE",
      year: "2026"
    },
    {
      num: "02",
      start: "AUGUST 03",
      end: "AUGUST 31",
      status: "AVAILABLE",
      year: "2026"
    }
  ];

  const documents = [
    {
      title: "28-DAY PRODUCTIVITY SCHEDULE & PRE-ARRIVAL GUIDE",
      file: "SyncRetreat_Deployment_Manifest.pdf"
    },
    {
      title: "Info about Pricing Schedule & Invoice",
      file: "payment.pdf"
    },
    {
      title: "What to Expect? & Opportunities",
      file: "SyncRetreat_Alignment_Protocol.pdf"
    }
  ];

  return (
    <section id="scheduler" className="bg-[#fefbf7] text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left Side: Date Selector */}
          <div>
            <div className="mb-10">
              <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
                COHORT SCHEDULE
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Choose Your Date
              </h2>
            </div>

            <div className="bg-white border border-stone-200 shadow-md rounded-3xl p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {cohorts.map((cohort, idx) => {
                  const isSelected = selectedCohort === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCohort(idx)}
                      className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 ${
                        isSelected 
                          ? "border-[var(--copper)] bg-[var(--copper)]/5 shadow-md"
                          : "border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex gap-4 mb-4">
                        <div>
                          <p className="text-[10px] text-zinc-500 font-mono uppercase">From</p>
                          <p className="text-lg font-bold text-zinc-900">{cohort.start}</p>
                        </div>
                        <div className="border-l border-stone-200 pl-4">
                          <p className="text-[10px] text-zinc-500 font-mono uppercase">To</p>
                          <p className="text-lg font-bold text-zinc-900">{cohort.end}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-serif font-bold text-zinc-900">{cohort.num}</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/50">
                            {cohort.status}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[var(--copper)] text-white flex items-center justify-center">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Link 
                href="/checkout"
                style={{ background: "var(--copper)" }}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-white font-sans font-bold uppercase tracking-wide cursor-pointer shadow-lg shadow-[var(--copper)]/20 hover:shadow-[var(--copper)]/40 transition-all text-center text-sm"
              >
                <Calendar size={16} />
                <span>Book Selected Cohort</span>
              </Link>
            </div>
          </div>

          {/* Right Side: PDF Download portal */}
          <div>
            <div className="mb-10">
              <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
                COMPLIANCE & PROTOCOLS
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Important Documents
              </h2>
            </div>

            <div className="bg-white border border-stone-200 shadow-md rounded-3xl p-6 md:p-8 space-y-4">
              {documents.map((doc, idx) => (
                <a
                  key={idx}
                  href={`/documents/${doc.file}`}
                  download
                  className="flex items-center justify-between w-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-zinc-800 font-sans font-bold py-4 px-6 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mr-4">
                    <FileText className="w-5 h-5 text-[var(--copper)] shrink-0 group-hover:scale-105 transition-transform" />
                    <span className="text-xs md:text-sm text-left leading-normal">{doc.title}</span>
                  </div>
                  <Download className="w-5 h-5 text-zinc-400 group-hover:text-[var(--copper)] shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

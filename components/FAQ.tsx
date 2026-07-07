"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What's included?",
      answer: "Villa accommodation, private room, single-occupancy workspace, Starlink + Fiber Dual-WAN internet, all meals handled daily, and a vetted community of 10-15 peer founders/operators."
    },
    {
      question: "Is this a co-working retreat?",
      answer: "No — it is a single-outcome execution sprint. There are zero leisure excursions, networking agendas, or required itineraries. You come with one defined deliverable and execute daily."
    },
    {
      question: "What is the refund policy?",
      answer: "Your deposit is fully refundable up to 30 days before the cohort starts. Within 30 days, we can roll your deposit over to a future cohort if your slot can be filled."
    },
    {
      question: "What if I need to leave early?",
      answer: "Since your seat is locked and cannot be filled mid-cohort, fees are non-refundable. However, we will handle all transport logistics and safety protocols to ensure a safe exit."
    },
    {
      question: "How reliable is the internet?",
      answer: "We run a dual-WAN redundant fiber loop containing high-speed local fiber backed up by a Starlink satellite terminal, delivering a tested uptime of 99.9% at 3,524 meters."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#fefbf7] text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase block mb-2">QUESTIONS</span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-stone-200 pb-4">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-4 text-left font-serif font-bold text-lg md:text-xl text-zinc-900 hover:text-[var(--copper)] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed pb-4 pt-1">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

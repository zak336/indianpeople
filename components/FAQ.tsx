"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who is Sync Retreat for?",
      answer: "Sync Retreat is for anyone who works remotely and wants to combine productive deep-work with experiencing India's most scenic locations. This includes freelancers, agency owners, remote tech professionals, creative workers (writers, designers, filmmakers), burned-out employees considering a leap, and early-stage founders. We also offer custom programs for corporate teams and small startup offsite groups."
    },
    {
      question: "What's included in the 7-day and 14-day plans?",
      answer: "Both plans include: private ensuite room accommodation, ergonomic co-working workspace, all meals (breakfast, lunch, and dinner), high-speed redundant internet, airport/station transfers, and access to the Sync Retreat community. The 14-day plan additionally includes two curated weekend exploration outings to local scenic spots."
    },
    {
      question: "Can I work on client projects during the retreat?",
      answer: "Yes. Our spaces operate on a 'Work-First' protocol. Core work hours (9 AM – 6 PM) are strictly silent deep-work periods with dual-redundant high-speed Wi-Fi and power backups. Community excursions and group dinners happen strictly outside working hours."
    },
    {
      question: "What is the Yearly Pass?",
      answer: "The Yearly Pass (₹1,49,999) gives you 2 retreat trips to any Sync Retreat location across India, at any time during the year. You get priority date selection before spots open to the public. Each trip can be used as a 7-day or 14-day plan. Trips can be rolled over to the following year if unused."
    },
    {
      question: "Do you handle corporate offsites and team bookings?",
      answer: "Yes. We provide dedicated private villas, custom catering, team-building facilitators, and 100% GST-compliant invoices with Input Tax Credit (ITC) eligibility. Email us at contact@syncretreat.com for a custom quote."
    },
    {
      question: "What is the refund and cancellation policy?",
      answer: "100% refundable deposit up to 30 days before start date. If cancelled within 30 days, your deposit converts into a lifetime credit valid across any future SyncRetreat."
    },
    {
      question: "Which locations are currently available?",
      answer: "Our next retreat is in Varkala, Kerala starting October 19, 2026. Ladakh was our inaugural location. Manali and Jaipur are coming soon. We run 9 retreat windows per season — the same start dates apply to both 7-day and 14-day plans."
    },
    {
      question: "What is the Room Upgrade?",
      answer: "For ₹19,999 extra on any 7-day or 14-day booking, you can upgrade to a premium suite category — typically featuring a larger room, premium bedding, enhanced bathroom amenities, and where available, a private balcony or terrace with scenic views."
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-(--copper) uppercase block mb-2">QUESTIONS</span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-stone-200 pb-4">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-4 text-left font-serif font-bold text-lg md:text-xl text-zinc-900 hover:text-(--copper) transition-colors cursor-pointer"
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

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who is Sync Retreat for?",
      answer: "The individual workation is for remote professionals, freelancers, agency owners, founders, and creators who can work away from home. Team offsites are for remote-first startups, agencies, and distributed teams of 5–50 people."
    },
    {
      question: "What's included in the 7-day and 14-day plans?",
      answer: "Both plans include a private ensuite room, dedicated workspace, primary and backup internet, airport/station transfers, and community access. The 7-day plan includes breakfast and lunch daily plus two excursion lunches and one signature experience. The 14-day plan includes those meals plus two weekend trips and community sessions."
    },
    {
      question: "Can I work on client projects during the retreat?",
      answer: "Yes. The sample schedule protects focused work from 9 AM–1 PM and 2–5 PM. Calls and meetings are welcome; the confirmed property and workspace details, including internet test results, are shared before payment."
    },
    {
      question: "What is the Yearly Pass?",
      answer: "The Yearly Pass is a separate product for two India retreats. It is shown below the main 7-day and 14-day booking path so you can choose the Varkala retreat without comparing unrelated products."
    },
    {
      question: "What is the exact property?",
      answer: "The confirmed Varkala property name, room photos, workspace photos, and location are shared with each guest before the deposit is paid. The current public page uses a Kerala reference image rather than presenting stock imagery as the booked property."
    },
    {
      question: "What is the internet speed and backup arrangement?",
      answer: "The stay includes a primary connection plus backup internet or hotspot access. The measured speed test and backup arrangement for the confirmed property are shared before payment."
    },
    {
      question: "What meals are included?",
      answer: "The 14-day plan includes breakfast and lunch daily, plus two excursion lunches. The 7-day plan follows the same daily meal pattern with two excursion lunches. Flights and personal expenses are not included."
    },
    {
      question: "Do you handle corporate offsites and team bookings?",
      answer: "Yes. We provide dedicated private villas, custom catering, team-building facilitators, and 100% GST-compliant invoices with Input Tax Credit (ITC) eligibility. Email us at contact@syncretreat.com for a custom quote."
    },
    {
      question: "What is the refund and cancellation policy?",
      answer: "For the October 19, 2026 retreat, the ₹29,999 deposit is 100% refundable until September 19, 2026. After that deadline, the deposit converts into a lifetime credit valid across future Sync Retreat dates."
    },
    {
      question: "What happens if the retreat is postponed?",
      answer: "You can move your booking to the replacement date or request a full refund of amounts paid. We will contact every booked guest directly if a date changes."
    },
    {
      question: "How do I reach the property from the airport?",
      answer: "Round-trip airport or station pickup and drop are included. The Varkala arrival route and pickup instructions are included in the pre-arrival guide sent after booking."
    },
    {
      question: "Which locations are currently available?",
      answer: "The currently bookable retreat is Varkala, Kerala, October 19–November 2, 2026. Ladakh is a past retreat; Manali and Jaipur are future locations."
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

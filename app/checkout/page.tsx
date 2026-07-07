"use client";
import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, ArrowRight, ChevronLeft } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import Link from 'next/link';

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          setIsBooked(true);
        },
      });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#c96e38" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto relative">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 text-xs font-mono uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
                  Schedule your onboarding
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  Pick a convenient time for a quick alignment call with our
                  team. We're excited to have you on board!
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-copper/10 p-3 rounded-2xl shadow-sm">
                      <CalendarCheck className="w-6 h-6 text-copper" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        Select a Time
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Duration: 15 minutes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-0 bg-white w-full h-[650px] overflow-hidden rounded-b-3xl relative">
                  {/* Clean Loading Spinner */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
                    <div className="w-10 h-10 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] animate-pulse">
                      Loading Calendar...
                    </p>
                  </div>

                  <div className="relative z-10 w-full h-full">
                    <Cal
                      calLink="syncretreat/meet"
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                      config={{ layout: "month_view" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-copper/5 w-full max-w-2xl text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-[50%] -right-[50%] w-full h-full rounded-full bg-copper/5 blur-3xl" />
                  <div className="absolute -bottom-[50%] -left-[50%] w-full h-full rounded-full bg-orange-50/50 blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="w-24 h-24 bg-copper/10 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner border-4 border-copper/5"
                  >
                    <CheckCircle2 className="w-12 h-12 text-copper" />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">
                    Thank you, {userName}!
                  </h2>

                  <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">
                    Your onboarding call has been successfully scheduled. We've
                    sent a calendar invitation to your email with all the
                    details.
                  </p>

                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 bg-copper hover:bg-copper-dark text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Return to Home
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


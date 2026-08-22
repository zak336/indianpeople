"use client";
import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────
type Plan = "7day" | "14day" | "yearly" | "enterprise";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  plan: Plan;
  retreatDate: string;
  upgradeRoom: boolean;
  notes: string;
}

// ─── Data ────────────────────────────────────────────────────
const retreatDates = [
  { label: "Oct 19, 2026", value: "2026-10-19" },
  { label: "Nov 2, 2026", value: "2026-11-02" },
  { label: "Nov 16, 2026", value: "2026-11-16" },
  { label: "Nov 30, 2026", value: "2026-11-30" },
  { label: "Dec 14, 2026", value: "2026-12-14" },
  { label: "Dec 28, 2026", value: "2026-12-28" },
  { label: "Jan 11, 2027", value: "2027-01-11" },
  { label: "Jan 25, 2027", value: "2027-01-25" },
  { label: "Feb 8, 2027", value: "2027-02-08" },
];

const plans = [
  { id: "7day" as Plan, label: "7-Day Tourist Plan", price: 79999, deposit: 29999, duration: "7 days" },
  { id: "14day" as Plan, label: "14-Day Workation Plan", price: 79999, deposit: 29999, duration: "14 days", popular: true },
  { id: "yearly" as Plan, label: "Yearly Pass (2 Trips)", price: 149999, deposit: 149999, duration: "2 trips / year" },
  { id: "enterprise" as Plan, label: "Enterprise / Team Offsite", price: 0, deposit: 0, duration: "Custom" },
];

const UPGRADE_PRICE = 19999;
const DEPOSIT = 29999;

// ─── Razorpay loader ─────────────────────────────────────────
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id?: string;
  name: string;
  description: string;
  image: string;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, string>;
  theme: { color: string };
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal: { ondismiss: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Main Component ──────────────────────────────────────────
export default function Checkout() {
  const [step, setStep] = useState<"form" | "success" | "enterprise">("form");
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    plan: "14day",
    retreatDate: retreatDates[0].value,
    upgradeRoom: false,
    notes: "",
  });

  const selectedPlan = plans.find((p) => p.id === form.plan)!;
  const isEnterprise = form.plan === "enterprise";
  const isStandardPlan = form.plan === "7day" || form.plan === "14day";
  const totalDeposit = isEnterprise ? 0 : selectedPlan.deposit + (isStandardPlan && form.upgradeRoom ? UPGRADE_PRICE : 0);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEnterprise) {
      setStep("enterprise");
      return;
    }

    if (!form.name || !form.email || !form.phone || (isStandardPlan && !form.retreatDate)) {
      alert("Please fill all required fields.");
      return;
    }

    setIsProcessing(true);
    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load payment gateway. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Order on Server
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalDeposit * 100 })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderData.orderId) {
        alert("Failed to initialize payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      // 2. Open Razorpay Modal
      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount, // paise
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Sync Retreat",
        description: `${selectedPlan.label} · ${isStandardPlan ? retreatDates.find(d => d.value === form.retreatDate)?.label + " · Deposit" : "Flexible Dates"}`,
        image: "/logo.jpeg",
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          plan: selectedPlan.label,
          retreat_date: form.retreatDate,
          room_upgrade: form.upgradeRoom ? "Yes" : "No",
        },
        theme: {
          color: "#C97C2E",
        },
        handler: async function (response: RazorpayResponse) {
          // 3. Verify Payment Signature on Server
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  plan: selectedPlan.label,
                  retreatDate: form.retreatDate,
                  upgradeRoom: form.upgradeRoom,
                  amount: orderData.amount
                }
              })
            });
            
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setStep("success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (e) {
            console.error(e);
            alert("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-16 pb-16 px-4">
      <div className="max-w-2xl w-full mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 text-xs font-mono uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <AnimatePresence mode="wait">
          {/* ── Enterprise redirect ── */}
          {step === "enterprise" && (
            <motion.div
              key="enterprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-xl p-10 text-center"
            >
              <div className="w-16 h-16 bg-(--copper)/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-(--copper)" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-zinc-900 mb-3">We&apos;ll be in touch!</h2>
              <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">
                Our team will reach out to you at <strong>{form.email}</strong> within 24 hours with a custom enterprise quote.
              </p>
              <a
                href="mailto:contact@syncretreat.com"
                className="inline-flex items-center gap-2 bg-(--copper) text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wide text-sm hover:bg-(--copper-dark) transition-colors"
              >
                Email Us Directly
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="mt-6">
                <Link href="/" className="text-xs font-mono text-zinc-400 hover:text-zinc-700 uppercase tracking-wider">
                  ← Back to Home
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── Success ── */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-stone-200 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-(--copper)/5 blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 bg-(--copper)/10 rounded-full flex items-center justify-center mb-8 mx-auto"
                >
                  <CheckCircle2 className="w-12 h-12 text-(--copper)" />
                </motion.div>
                <h2 className="text-4xl font-serif font-bold text-zinc-900 mb-4">{isStandardPlan ? "Deposit Received!" : "Payment Received!"}</h2>
                <p className="text-zinc-500 mb-2 max-w-md mx-auto">
                  Your ₹{totalDeposit.toLocaleString("en-IN")} payment for <strong>{selectedPlan.label}</strong> {isStandardPlan && <span>starting <strong>{retreatDates.find(d => d.value === form.retreatDate)?.label}</strong></span>} is confirmed.
                </p>
                <p className="text-zinc-400 text-sm mb-10">A confirmation has been sent to {form.email}. Our team will follow up within 24 hours.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-(--copper) hover:bg-(--copper-dark) text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg"
                >
                  Return to Home
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── Form ── */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-3 tracking-tight">
                  Reserve Your Spot
                </h1>
                <p className="text-zinc-500 max-w-md mx-auto text-sm">
                  Fill in your details, choose your plan and date. We&apos;ll collect a ₹{DEPOSIT.toLocaleString("en-IN")} refundable deposit to secure your seat.
                </p>
              </div>

              <form onSubmit={handlePayment} className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">

                {/* Plan Selector */}
                <div className="p-7 md:p-8 border-b border-stone-100">
                  <label className="block text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mb-4">
                    Choose Your Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plans.map((plan) => (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => update("plan", plan.id)}
                        className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          form.plan === plan.id
                            ? "border-(--copper) bg-(--copper)/5"
                            : "border-stone-200 hover:border-stone-300 bg-stone-50"
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute top-2 right-2 bg-(--copper) text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          {plan.duration}
                        </p>
                        <p className="text-sm font-bold text-zinc-900">{plan.label}</p>
                        <p className="text-xs text-(--copper) font-mono mt-1">
                          {plan.price > 0 ? `₹${plan.price.toLocaleString("en-IN")}` : "Custom Quote"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selector (hidden for enterprise and yearly pass) */}
                {isStandardPlan && (
                  <div className="p-7 md:p-8 border-b border-stone-100">
                    <label className="block text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mb-4">
                      <Calendar className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                      Choose Your Retreat Start Date
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {retreatDates.map((date) => (
                        <button
                          type="button"
                          key={date.value}
                          onClick={() => update("retreatDate", date.value)}
                          className={`p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                            form.retreatDate === date.value
                              ? "border-(--copper) bg-(--copper)/8 text-(--copper)"
                              : "border-stone-200 hover:border-stone-300 text-zinc-700 bg-stone-50"
                          }`}
                        >
                          <p className="text-xs font-bold">{date.label.split(",")[0]}</p>
                          <p className="text-[10px] font-mono text-zinc-400">{date.label.split(",")[1]?.trim()}</p>
                        </button>
                      ))}
                    </div>

                    {/* Room upgrade toggle */}
                    <div className="mt-5 flex items-center justify-between bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-900">Room Upgrade</p>
                        <p className="text-xs text-zinc-500 mt-0.5">Premium suite · private balcony · enhanced amenities</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold text-(--copper)">+₹19,999</span>
                        <button
                          type="button"
                          onClick={() => update("upgradeRoom", !form.upgradeRoom)}
                          className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer ${
                            form.upgradeRoom ? "bg-(--copper)" : "bg-stone-300"
                          }`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                            form.upgradeRoom ? "left-6" : "left-0.5"
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Details */}
                <div className="p-7 md:p-8 border-b border-stone-100">
                  <label className="block text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mb-5">
                    <User className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                    Your Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-(--copper) focus:ring-2 focus:ring-(--copper)/10 transition-all bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-(--copper) focus:ring-2 focus:ring-(--copper)/10 transition-all bg-stone-50"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-(--copper) focus:ring-2 focus:ring-(--copper)/10 transition-all bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="e.g. Bangalore"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-(--copper) focus:ring-2 focus:ring-(--copper)/10 transition-all bg-stone-50"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs text-zinc-500 mb-1.5">Anything you&apos;d like us to know? (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Dietary requirements, goals, team size for enterprise..."
                      rows={3}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-(--copper) focus:ring-2 focus:ring-(--copper)/10 transition-all bg-stone-50 resize-none"
                    />
                  </div>
                </div>

                {/* Order Summary + CTA */}
                <div className="p-7 md:p-8 bg-stone-50">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">You&apos;re booking</p>
                      <p className="text-base font-bold text-zinc-900">{selectedPlan.label}</p>
                      {!isEnterprise && (
                        <>
                          {isStandardPlan && (
                            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {retreatDates.find(d => d.value === form.retreatDate)?.label}
                            </p>
                          )}
                          {isStandardPlan && form.upgradeRoom && (
                            <p className="text-xs text-(--copper) mt-0.5">+ Room Upgrade (₹19,999)</p>
                          )}
                        </>
                      )}
                    </div>
                    {!isEnterprise && (
                      <div className="text-right">
                        <p className="text-[10px] font-mono uppercase text-zinc-400 mb-0.5">{isStandardPlan ? "Deposit today" : "Total Price"}</p>
                        <p className="text-2xl font-serif font-bold text-zinc-900">
                          ₹{totalDeposit.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Refundable · 30 days notice</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{ background: "var(--copper)" }}
                    className="w-full py-4 rounded-full flex items-center justify-center gap-3 text-white font-bold uppercase tracking-wide text-sm shadow-xl shadow-(--copper)/25 hover:bg-(--copper-dark) hover:shadow-(--copper)/40 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : isEnterprise ? (
                      <>
                        <Mail className="w-4 h-4" />
                        Submit for Custom Quote
                      </>
                    ) : (
                      <>
                        Pay ₹{totalDeposit.toLocaleString("en-IN")} via Razorpay
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-3">
                    {isEnterprise ? "We'll respond within 24 hours with a custom quote" : "Secured by Razorpay · Refundable deposit"}
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

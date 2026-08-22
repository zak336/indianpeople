"use client";
import { motion } from "framer-motion";
import { Check, ChevronRight, Mail, Star, Infinity } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "7day",
    tag: "TOURIST PLAN",
    title: "7-Day Escape",
    price: "₹79,999",
    per: "per person",
    description: "A curated 7-day workation designed for Indian travellers who want to experience India's scenic locations while staying productive.",
    features: [
      "Private ensuite room",
      "Co-working workspace access",
      "All meals included",
      "Weekend exploration trips",
      "High-speed internet",
      "Airport transfers",
    ],
    cta: "Book Now",
    href: "/checkout",
    highlight: false,
    badge: null,
  },
  {
    id: "14day",
    tag: "WORKATION PLAN",
    title: "14-Day Deep Work",
    price: "₹79,999",
    per: "per person",
    description: "Two full weeks of structured deep work in a scenic Indian location. The flagship program for remote workers, freelancers & founders.",
    features: [
      "Private ensuite room",
      "Dedicated co-working desk",
      "All meals included",
      "Weekend exploration trips (2)",
      "Dual-WAN redundant internet",
      "Airport transfers",
      "Community of 10–15 peers",
    ],
    cta: "Book Now — Most Popular",
    href: "/checkout",
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    tag: "ENTERPRISE / B2B",
    title: "Team Offsite",
    price: "Custom Quote",
    per: "for teams of 5+",
    description: "Bespoke corporate offsites for startup teams, agencies and remote companies. Custom dates, private villa, dedicated program manager.",
    features: [
      "Private exclusive venue",
      "Custom program design",
      "Team-building experiences",
      "Dedicated coordinator",
      "Custom F&B arrangements",
      "100% GST Invoicing with Input Tax Credit (ITC) eligibility for corporate expense write-offs.",
    ],
    cta: "Get a Quote",
    href: "mailto:contact@syncretreat.com",
    highlight: false,
    badge: null,
  },
  {
    id: "yearly",
    tag: "YEARLY PASS",
    title: "Unlimited India",
    price: "₹1,49,999",
    per: "2 trips · anywhere · anytime",
    description: "The ultimate remote worker pass. Book any 2 retreats across any of our India locations throughout the year.",
    features: [
      "2 retreats · any location",
      "7-day or 14-day per trip",
      "Priority date selection",
      "Full program inclusions",
      "Rollover to next year",
      "Community lifetime access",
    ],
    cta: "Get Yearly Pass",
    href: "/checkout",
    highlight: false,
    badge: "Best Value",
  },
  {
    id: "upgrade",
    tag: "ADD-ON",
    title: "Room Upgrade",
    price: "+₹19,999",
    per: "per booking",
    description: "Upgrade to a premium suite with enhanced amenities — larger room, premium bedding, private balcony with scenic view.",
    features: [
      "Premium suite category",
      "Private balcony / terrace",
      "Enhanced bedding & bath",
      "Available on 7 & 14-day plans",
    ],
    cta: "Add at Checkout",
    href: "/checkout",
    highlight: false,
    badge: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Programs() {
  return (
    <section id="pricing" className="bg-white text-zinc-900 py-20 md:py-28 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-(--copper) mb-3">
              PLANS & PRICING
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-tight">
              Find the plan that fits your journey.
            </h2>
            <p className="mt-4 text-sm md:text-base font-sans leading-relaxed text-zinc-500 max-w-lg">
              From solo travellers to enterprise teams — every plan includes a curated stay, co-working infrastructure, and the Sync Retreat experience.
            </p>
          </div>
          <Link
            href="/checkout"
            className="shrink-0 self-start md:self-end inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-(--copper) text-white font-sans font-bold uppercase tracking-wide text-sm hover:bg-(--copper-dark) transition-colors shadow-lg"
          >
            Reserve a Spot <ChevronRight size={16} />
          </Link>
        </div>

        {/* Main plans: 2-col top row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.slice(0, 2).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* Bottom row: 3-col */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.slice(2).map((plan) => (
            <PlanCard key={plan.id} plan={plan} compact />
          ))}
        </motion.div>

        {/* Deposit note */}
        <p className="text-center text-xs font-mono text-zinc-400 uppercase tracking-widest mt-10">
          All bookings require a ₹29,999 refundable deposit · Full amount due 14 days before retreat
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, compact = false }: { plan: typeof plans[0]; compact?: boolean }) {
  const isEnterprise = plan.id === "enterprise";
  const isYearly = plan.id === "yearly";
  const isHighlighted = plan.highlight;

  return (
    <motion.div
      variants={cardVariants}
      className={`relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl ${
        isHighlighted
          ? "bg-(--basalt) border-(--copper)/30 text-white shadow-2xl shadow-(--copper)/10"
          : "bg-stone-50 border-stone-200 text-zinc-900 hover:border-stone-300"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
          isHighlighted
            ? "bg-(--copper) text-white"
            : isYearly
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
            : "bg-zinc-200 text-zinc-700"
        }`}>
          {isYearly ? <Star size={10} /> : null}
          {plan.badge}
        </div>
      )}

      <div className={`p-7 md:p-8 flex flex-col flex-1 ${compact ? "p-6" : ""}`}>
        {/* Tag */}
        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-3 ${
          isHighlighted ? "text-(--copper-light)" : "text-(--copper)"
        }`}>
          {plan.tag}
        </span>

        {/* Title + Price */}
        <div className="mb-5">
          <h3 className={`font-serif font-bold mb-3 ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}>
            {plan.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`font-serif font-bold ${compact ? "text-2xl" : "text-3xl md:text-4xl"} ${
              isHighlighted ? "text-white" : isEnterprise ? "text-zinc-400" : "text-zinc-900"
            }`}>
              {plan.price}
            </span>
            {isYearly && <Infinity size={18} className="text-emerald-600" />}
          </div>
          <p className={`text-xs font-mono mt-1 ${isHighlighted ? "text-zinc-400" : "text-zinc-400"}`}>
            {plan.per}
          </p>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-6 ${isHighlighted ? "text-zinc-300" : "text-zinc-500"}`}>
          {plan.description}
        </p>

        {/* Features */}
        <ul className={`space-y-2.5 flex-1 mb-8 ${compact ? "mb-6" : ""}`}>
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check size={14} className={`shrink-0 mt-0.5 ${
                isHighlighted ? "text-(--copper-light)" : "text-(--sage)"
              }`} />
              <span className={isHighlighted ? "text-zinc-300" : "text-zinc-600"}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isEnterprise ? (
          <a
            href={plan.href}
            className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 bg-white text-zinc-900 font-bold uppercase tracking-wide text-sm hover:bg-zinc-100 transition-colors border border-stone-200"
          >
            <Mail size={15} />
            {plan.cta}
          </a>
        ) : (
          <Link
            href={plan.href}
            style={isHighlighted ? { background: "var(--copper)" } : {}}
            className={`w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-sm transition-all duration-300 ${
              isHighlighted
                ? "text-white shadow-lg shadow-(--copper)/30 hover:shadow-(--copper)/50 hover:bg-(--copper-dark)"
                : "bg-zinc-900 text-white hover:bg-zinc-700"
            }`}
          >
            {plan.cta}
            <ChevronRight size={15} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

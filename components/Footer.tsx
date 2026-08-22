"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsWhatsapp,
  BsArrowRight,
  BsCheckLg,
} from "react-icons/bs";
import { supabase } from "../lib/supabase";

const socialLinks = [
  { icon: BsTwitter, href: "https://x.com/RetreatSyn57144", label: "Twitter" },
  { icon: BsInstagram, href: "https://www.instagram.com/sync.retreat/", label: "Instagram" },
  { icon: BsLinkedin, href: "https://www.linkedin.com/company/syncretreat/", label: "LinkedIn" },
  { icon: BsWhatsapp, href: "https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9", label: "WhatsApp" },
];

const links = [
  { label: "About", href: "/#about" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faq" },
  { label: "Enterprise", href: "mailto:contact@syncretreat.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase
        .from("newsletter")
        .insert([{ email: email.toLowerCase().trim() }]);
      if (error && error.code !== "23505") throw error;
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-(--basalt) border-t border-white/5 text-white w-full">
      <div className="w-full px-6 md:px-12 py-8 max-w-7xl mx-auto">

        {/* Top: brand + newsletter + links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-6 md:max-w-md w-full">
            <div>
              <span className="text-white text-2xl font-black tracking-tight">
                SyncRetreat<span className="text-(--copper)">.</span>
              </span>
              <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-wider">
                Work Remotely. Explore India.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center border-b border-white/20 pb-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get the Remote Worker's Guide to Geo-Arbitrage in India (+ Early Access to Cohort Dates)."
                disabled={status === "loading"}
                className="bg-transparent flex-1 text-sm text-white placeholder-slate-500 focus:outline-none"
                suppressHydrationWarning
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="text-slate-400 hover:text-(--copper) transition-colors"
              >
                {status === "success" ? (
                  <BsCheckLg className="w-4 h-4 text-emerald-500" />
                ) : (
                  <BsArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-(--copper)/20 hover:text-(--copper) hover:border-(--copper)/50 transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8 items-center text-sm font-medium text-slate-400">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-(--copper) transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Destinations row */}
        <div className="border-t border-white/10 pt-5 mb-5">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-3">Destinations</p>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> Ladakh (Past)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Varkala, Kerala (Next)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Manali (Coming Soon)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Jaipur (Coming Soon)
            </span>
          </div>
        </div>

        {/* Trust Markers */}
        <div className="border-t border-white/10 pt-5 pb-3 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-[10px] md:text-xs text-zinc-500 font-sans">
          <div className="flex flex-col gap-0.5 text-center md:text-left">
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Company Information</p>
            <p>SYNCRETREAT LLP (LLPIN: ADA-6168)</p>
            <p>Registered Office: Bhilai, CG, India, 490026</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Secure Payments</p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-zinc-400 text-[10px]">
                🔒 256-bit SSL Secure
              </span>
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-zinc-400 text-[10px]">
                ⚡ Powered by Razorpay
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-[10px] md:text-xs text-slate-500 font-medium">
          <p>© 2026 SYNCRETREAT LLP. Engineered for focus.</p>
          <div className="flex items-center gap-4 text-zinc-600">
            <Link href="/terms" className="hover:text-(--copper) transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-(--copper) transition-colors">Privacy</Link>
            <p>contact@syncretreat.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

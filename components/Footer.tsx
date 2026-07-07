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
  {
    icon: BsInstagram,
    href: "https://www.instagram.com/sync.retreat/",
    label: "Instagram",
  },
  {
    icon: BsLinkedin,
    href: "https://www.linkedin.com/company/syncretreat/",
    label: "LinkedIn",
  },
  {
    icon: BsWhatsapp,
    href: "https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9",
    label: "WhatsApp",
  },
];

const links = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "FAQs", href: "/faqs" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
    <footer className="bg-[#1A2421] border-t border-white/5 text-white w-full">
      <div className="w-full px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-6 md:max-w-md w-full">
            <span className="text-white text-2xl font-black tracking-tight">
              SyncRetreat<span className="text-emerald-900">.</span>
            </span>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center border-b border-white/20 pb-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Stay updated with our latest launches and deals"
                disabled={status === "loading"}
                className="bg-transparent flex-1 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
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
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
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
                className="hover:text-emerald-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-slate-500 font-medium">
          <p>© 2026 SyncRetreat. Engineered for focus.</p>
        </div>
      </div>
    </footer>
  );
}


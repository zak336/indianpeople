"use client";
import { Home, Info, Calendar, Image } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingNav() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("#home, #about, #programs, #gallery");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getLinkClass = (id: string) => {
    const isActive = activeId === id;
    return `p-3 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-[var(--copper)] text-white scale-110 shadow-lg shadow-[var(--copper)]/30"
        : "text-zinc-400 hover:text-[var(--copper)] hover:bg-zinc-100"
    }`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 bg-white/95 backdrop-blur-xl px-3 py-6 rounded-full shadow-2xl border border-zinc-200"
    >
      <a href="#home" className={getLinkClass("home")} title="Home">
        <Home size={22} />
      </a>
      <a href="#about" className={getLinkClass("about")} title="About">
        <Info size={22} />
      </a>
      <a href="#programs" className={getLinkClass("programs")} title="Programs">
        <Calendar size={22} />
      </a>
      <a href="#gallery" className={getLinkClass("gallery")} title="Gallery">
        <Image size={22} />
      </a>
    </motion.div>
  );
}

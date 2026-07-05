"use client";

import ExpeditionReceipt from "@/components/BookingCard";
import About from "@/components/ScrollAbout";
import ScrollHorizontal from "@/components/ScrollHorizontal";
import Programs from "@/components/ScrollPrograms";
import Hero from "@/components/ScrollZoomHero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const panels = document.querySelectorAll(".panel");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      {
        threshold: 0.5,
      }
    );

    panels.forEach((panel) => observer.observe(panel));

    return () => observer.disconnect();
  }, []);

  return (
    <main>

        <Hero />

     <About />
     <Programs/>
     <ExpeditionReceipt />
      {/* <section className="panel sticky top-0 z-40 flex h-screen items-center justify-center bg-zinc-700 text-6xl font-bold text-white">
        Section 3
      </section> */}
    </main>
  );
}
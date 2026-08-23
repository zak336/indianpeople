"use client";

import About from "@/components/ScrollAbout";
import ScrollGallery from "@/components/ScrollGallery";
import Programs from "@/components/ScrollPrograms";
import Hero from "@/components/ScrollZoomHero";
import FloatingNav from "@/components/FloatingNav";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PlacesToSee from "@/components/PlacesToSee";
import Coliving from "@/components/Coliving";
import Scheduler from "@/components/Scheduler";
import BookingCard from "@/components/BookingCard";
import FounderCredibility from "@/components/FounderCredibility";
import { useEffect } from "react";
import { PRICING } from "@/lib/pricing";

export default function Home() {
  useEffect(() => {
    const panels = document.querySelectorAll(".panel");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  // ── Structured Data ──────────────────────────────────────────

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sync Retreat",
    url: "https://india.syncretreat.com",
    logo: "https://india.syncretreat.com/assets/icon.jpeg",
    description: "Premium workation retreats across India's most scenic locations — Varkala, Ladakh, Manali, Jaipur. 7-day and 14-day programs for remote workers, freelancers, founders, and corporate teams.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@syncretreat.com",
      contactType: "customer support",
    },
    sameAs: [
      "https://x.com/RetreatSyn57144",
      "https://www.instagram.com/sync.retreat/",
      "https://www.linkedin.com/company/syncretreat/",
    ],
  };

  const product7DayData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sync Retreat — 7-Day Tourist Workation Plan",
    description: "7-day workation retreat across India's most scenic locations. Private ensuite room, co-working workspace, all meals, and weekend explorations included.",
    image: "https://india.syncretreat.com/assets/hero.jpeg",
    brand: { "@type": "Brand", name: "Sync Retreat" },
    offers: {
      "@type": "Offer",
      url: "https://india.syncretreat.com/checkout",
      priceCurrency: "INR",
      price: PRICING.plan7Day.price.toString(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const product14DayData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sync Retreat — 14-Day Deep Work Workation Plan",
    description: "14-day structured workation for remote workers, freelancers, and founders. Scenic India locations, co-working infrastructure, all meals, and peer community.",
    image: "https://india.syncretreat.com/assets/hero.jpeg",
    brand: { "@type": "Brand", name: "Sync Retreat" },
    offers: {
      "@type": "Offer",
      url: "https://india.syncretreat.com/checkout",
      priceCurrency: "INR",
      price: PRICING.plan14Day.price.toString(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "15",
    },
  };

  const upcomingEventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sync Retreat — Varkala, Kerala Workation",
    description: "A curated 7-day and 14-day workation at the clifftop coastal town of Varkala, Kerala. High-speed internet, private rooms, co-working workspace, all meals, and weekend coastal explorations.",
    image: "https://india.syncretreat.com/assets/hero.jpeg",
    startDate: "2026-10-19",
    endDate: "2026-11-02",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Varkala, Kerala",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Varkala",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    offers: [
      {
        "@type": "Offer",
        name: "7-Day Tourist Plan",
        url: "https://india.syncretreat.com/checkout",
        price: PRICING.plan7Day.price.toString(),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "14-Day Workation Plan",
        url: "https://india.syncretreat.com/checkout",
        price: PRICING.plan14Day.price.toString(),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ],
    organizer: {
      "@type": "Organization",
      name: "Sync Retreat",
      url: "https://india.syncretreat.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product7DayData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product14DayData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(upcomingEventData) }}
      />

      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Coliving />
        <PlacesToSee />
        
        <FounderCredibility />
        <BookingCard />
        <Programs />
        <Scheduler />

        {/* High Impact Quote Section */}
        <section className="bg-(--basalt) text-white py-24 px-6 md:px-12 lg:px-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,124,46,0.12),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(74,124,89,0.08),transparent_55%)] pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-xs font-mono tracking-[0.4em] text-(--copper-light) uppercase mb-6 block">
              THE VISION
            </span>
            <blockquote className="text-3xl md:text-5xl font-serif italic font-medium leading-tight text-stone-100 tracking-tight">
              &ldquo;India has always been a land of seekers. We built a place for those who seek both great work and great experiences.&rdquo;
            </blockquote>
            <div className="w-12 h-px bg-(--copper) mx-auto mt-10 rounded-full" />
            <p className="mt-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
              — Sync Retreat, India
            </p>
          </div>
        </section>

        <ScrollGallery />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
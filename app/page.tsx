"use client";

import About from "@/components/ScrollAbout";
import ScrollGallery from "@/components/ScrollGallery";
import Programs from "@/components/ScrollPrograms";
import Hero from "@/components/ScrollZoomHero";
import FloatingNav from "@/components/FloatingNav";
import FloatingAbout from "@/components/FloatingAbout";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PlacesToSee from "@/components/PlacesToSee";
import Scheduler from "@/components/Scheduler";
import BookingCard from "@/components/BookingCard";
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
    description: "7-day Varkala workation with a private ensuite room, dedicated desk, reliable connectivity, breakfast and lunch daily, and weekend experiences.",
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
    description: "14-day Varkala workation with a private ensuite room, dedicated desk, reliable connectivity, breakfast and lunch daily, two weekend trips, and peer community.",
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
    description: "A curated 7-day and 14-day workation at the clifftop coastal town of Varkala, Kerala. Private rooms, dedicated desks, primary and backup internet, meals, and weekend coastal explorations.",
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
      <FloatingAbout />
      <main>
        <Hero />
        <About />
        <PlacesToSee />
        <Programs />
        <Scheduler />
        <BookingCard />
        <ScrollGallery />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
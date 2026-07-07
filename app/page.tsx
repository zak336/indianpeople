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
import Community from "@/components/Community";
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sync Retreat - 14-Day Execution Program",
    description: "A fixed execution window for early-stage founding teams in Leh, Ladakh. Commercial-grade internet, redundant power and ergonomic workstations engineered for uninterrupted focus.",
    image: "https://india.syncretreat.com/assets/hero.jpeg",
    startDate: "2026-08-10",
    endDate: "2026-08-24",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Leh, Ladakh",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "34.1526",
        longitude: "77.5771",
        elevation: "3524",
      },
    },
    offers: {
      "@type": "Offer",
      url: "https://india.syncretreat.com",
      price: "25000",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    performer: {
      "@type": "Organization",
      name: "Sync Retreat",
    },
    organizer: {
      "@type": "Organization",
      name: "Sync Retreat",
      url: "https://india.syncretreat.com",
    },
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sync Retreat",
    url: "https://india.syncretreat.com",
    logo: "https://india.syncretreat.com/assets/hero.jpeg",
    description: "Structured execution programs for founding teams at high altitude",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Leh",
      addressRegion: "Ladakh",
      addressCountry: "IN",
    },
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sync Retreat - 14-Day Founder Program",
    description: "Structured focus blocks for founding teams. Teams define their milestone on day one and execute toward it daily with mentor reviews and accountability checkpoints.",
    image: "https://india.syncretreat.com/assets/hero.jpeg",
    offers: {
      "@type": "Offer",
      url: "https://india.syncretreat.com",
      priceCurrency: "INR",
      price: "25000",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "15",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Coliving />
        <Programs/>
        <Community />
        <PlacesToSee />
        <Scheduler />
        <ScrollGallery />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
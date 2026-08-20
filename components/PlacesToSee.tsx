"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    title: "Ladakh",
    tagline: "High Altitude Escape",
    description: "The original Sync Retreat location. Rugged landscapes, Buddhist monasteries, and crystal-clear mountain air at 3,524m.",
    status: "Past Retreat",
    statusColor: "bg-zinc-100 text-zinc-600 border-zinc-200",
    image: "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop",
    region: "Jammu & Kashmir",
  },
  {
    title: "Varkala, Kerala",
    tagline: "Clifftop Coastal Retreat",
    description: "Red laterite cliffs meeting the Arabian Sea. Morning yoga, fresh seafood, and sunset co-working sessions by the ocean.",
    status: "Next Up",
    statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1470&auto=format&fit=crop",
    region: "Kerala",
    href: "/checkout",
    highlight: true,
  },
  {
    title: "Manali, Himachal",
    tagline: "Mountain Valley Focus",
    description: "Pine forests, snow-capped peaks, and the gentle Beas river. A Himalayan setting for clear thinking and deep work.",
    status: "Coming Soon",
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFuYWxpfGVufDB8MHwwfHx8MA%3D%3D",
    region: "Himachal Pradesh",
  },
  {
    title: "Jaipur, Rajasthan",
    tagline: "Royal Heritage Workation",
    description: "Pink city grandeur, centuries-old havelis, and the warm light of the Thar Desert. Culture meets productivity.",
    status: "Coming Soon",
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    region: "Rajasthan",
  },
];

export default function PlacesToSee() {
  return (
    <section id="destinations" className="bg-white text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            DESTINATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
            India&apos;s Most Scenic Locations
          </h2>
          <p className="text-zinc-500 font-sans text-sm md:text-base leading-relaxed mt-4">
            We curate retreats at handpicked locations across India — each chosen for natural beauty, connectivity, and the unique experience it offers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${
                dest.highlight
                  ? "bg-[var(--basalt)] border-[var(--copper)]/30 shadow-xl shadow-[var(--copper)]/10"
                  : "bg-stone-50 border-stone-200 hover:shadow-lg hover:border-stone-300"
              }`}
            >
              {/* Image Frame */}
              <div className="overflow-hidden aspect-video relative">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Status badge */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${dest.statusColor} ${dest.highlight ? "bg-emerald-500 text-white border-emerald-400" : ""}`}>
                  {dest.status === "Next Up" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  {dest.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={11} className={dest.highlight ? "text-[var(--copper-light)]" : "text-[var(--copper)]"} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${dest.highlight ? "text-zinc-400" : "text-zinc-400"}`}>
                    {dest.region}
                  </span>
                </div>
                <h3 className={`text-lg font-serif font-bold mb-1 ${dest.highlight ? "text-white" : "text-zinc-900"}`}>
                  {dest.title}
                </h3>
                <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${dest.highlight ? "text-[var(--copper-light)]" : "text-[var(--copper)]"}`}>
                  {dest.tagline}
                </p>
                <p className={`text-sm leading-relaxed flex-grow ${dest.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                  {dest.description}
                </p>

                {dest.href && (
                  <Link
                    href={dest.href}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[var(--copper)] px-4 py-2.5 rounded-full hover:bg-[var(--copper-dark)] transition-colors"
                  >
                    Book Varkala <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

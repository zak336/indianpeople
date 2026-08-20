"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Coliving() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1480&auto=format&fit=crop",
      alt: "Sync Retreat scenic property exterior"
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop",
      alt: "Sync Retreat co-working workspace setup"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
      alt: "Sync Retreat private ensuite accommodation"
    }
  ];

  return (
    <section id="coliving" className="bg-[#fefbf7] text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            THE EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
            Our Spaces Across India
          </h2>
          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed mt-4">
            Handpicked properties at scenic Indian locations — each offering private ensuite rooms, ergonomic co-working infrastructure, and zero operational friction so you can focus entirely on your work.
          </p>
        </div>

        {/* 3 Image Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group overflow-hidden rounded-3xl shadow-lg border border-stone-200/50 relative h-[35vh]"
            >
              <Image
                alt={img.alt}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                src={img.src}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Amenities row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Private Ensuite Room", icon: "🛏" },
            { label: "Ergonomic Workspace", icon: "💻" },
            { label: "All Meals Included", icon: "🍽" },
            { label: "High-Speed Internet", icon: "📡" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-5 text-center shadow-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

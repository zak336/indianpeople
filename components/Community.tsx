"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Community() {
  const cards = [
    {
      title: "High-Signal Networking",
      description: "Build relationships with cross-departmental teams, funded founders, freelancers, and senior operators.",
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Strategic Cross-Pollination",
      description: "Exchange ideas, engineering frameworks, and product strategies with professionals from different roles.",
      image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Deep Reconnection",
      description: "Step away from the screen to decompress and bond in one of the most stunning, raw locations on Earth.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <section id="community" className="bg-zinc-900 text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            VETTED NETWORK
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Not a Travel Program, a Community
          </h2>
          <p className="text-zinc-400 font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We live, explore, and build together. Embracing openness and curiosity, we explore new places and ideas to strengthen our corporate culture and products.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl shadow-xl border border-zinc-800 mb-8 aspect-[4/3] relative">
                <Image 
                  alt={card.title} 
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={card.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">{card.title}</h3>
              <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

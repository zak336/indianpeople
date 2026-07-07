"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Coliving() {
  const images = [
    {
      src: "https://a0.muscache.com/im/pictures/miso/Hosting-18737819/original/8c0e5cae-4bed-4e0b-9d0b-f224dc3a64f2.jpeg?im_w=1200",
      alt: "Sync Retreat Ladakh Villa Outer View"
    },
    {
      src: "https://a0.muscache.com/im/pictures/8d4ef684-31ed-4836-8e63-a9954aa751e2.jpg?im_w=720",
      alt: "Sync Retreat Ladakh Villa Workspace Design"
    },
    {
      src: "https://a0.muscache.com/im/pictures/5e20521b-e3ce-492a-864f-39ed49a6833c.jpg?im_w=1440",
      alt: "Sync Retreat Ladakh Ensuite Executive Quarters"
    }
  ];

  return (
    <section id="coliving" className="bg-white text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            THE PRIVATE SANCTUARY
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
            Our Home in Ladakh
          </h2>
          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed mt-4">
            A premium private villa engineered for execution. We provide single-occupancy workspaces, private rooms, and zero operational friction.
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

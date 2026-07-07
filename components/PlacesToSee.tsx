"use client";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import Image from "next/image";

export default function PlacesToSee() {
  const weekends = [
    {
      title: "Weekend 1: Monasteries & Tsemo",
      day1: "Explore Thiksey & Hemis monasteries. Standouts of ancient Buddhist architecture and heritage in Ladakh.",
      day2: "Leh Palace, Tsemo Castle & sunset at Shanti Stupa for panoramic views of Leh town.",
      image: "https://charzanholidays.com/wp-content/uploads/2024/12/Thiksey_Monastery-ladakh_charzan_holidays.jpg"
    },
    {
      title: "Weekend 2: Sangam & Alchi",
      day1: "Visit Gurudwara Pathar Sahib, experience Magnetic Hill, and view the confluence of Indus and Zanskar rivers at Sangam.",
      day2: "Visit the 1,000-year-old Alchi Monastery and Likir Monastery. Back by 4 PM.",
      image: "https://topclassholidays.com/wp-content/uploads/2025/07/Magnetic-Hill-Ladakh.jpg"
    },
    {
      title: "Weekend 3: Khardung La & Nubra",
      day1: "Cross Khardung La Pass (17,582 ft)—one of the highest motorable roads—and take a Bactrian camel safari in Hunder sand dunes.",
      day2: "Visit the 106-foot Maitreya Buddha at Diskit Monastery. Return by 3 PM.",
      image: "https://www.eladakhtourism.com/camps-in-nubra/images/paramountcamp.jpg"
    },
    {
      title: "Weekend 4: Pangong Lake Concluding",
      day1: "Depart at 5 AM for Pangong Lake via Chang La Pass—a high-altitude strike to view the crystal blue border lake.",
      day2: "Decompress. Farewell BBQ on the villa terrace, pack up, and prep for departure.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7IXjTKCvo8hReTEv1x5PrLXbQMsM5ZCfFZA&s"
    }
  ];

  return (
    <section id="places" className="bg-[#fefbf7] text-zinc-900 py-24 px-6 md:px-12 lg:px-24 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-[var(--copper)] uppercase mb-2 block">
            DECOMPRESSION OUTINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
            Places You Will See
          </h2>
          <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed mt-4">
            Four weekends of structured decompression expeditions. We handle all travel logistics, permits, and acclimatization parameters so you can relax.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {weekends.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md border border-stone-200/50"
            >
              {/* Image Frame */}
              <div className="overflow-hidden aspect-video relative">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[var(--copper)] flex items-center gap-1.5 font-bold shadow-sm">
                  <Compass size={10} />
                  WEEKEND 0{idx + 1}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-zinc-900 mb-4">
                    {item.title}
                  </h3>
                  <div className="space-y-3 font-sans text-xs md:text-sm text-zinc-600">
                    <div>
                      <span className="font-bold text-zinc-800 uppercase tracking-wide text-[10px] block mb-1">Day 1</span>
                      <p className="leading-relaxed">{item.day1}</p>
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <span className="font-bold text-zinc-800 uppercase tracking-wide text-[10px] block mb-1">Day 2</span>
                      <p className="leading-relaxed">{item.day2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

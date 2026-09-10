import { BedDouble, Car, Monitor, Utensils, Wifi } from "lucide-react";

const proofPoints = [
  { icon: BedDouble, label: "Private ensuite room" },
  { icon: Monitor, label: "Dedicated ergonomic desk" },
  { icon: Wifi, label: "Primary + backup internet" },
  { icon: Utensils, label: "Breakfast, lunch + excursion lunches" },
  { icon: Car, label: "₹29,999 refundable deposit" },
];

export default function ProofStrip() {
  return (
    <section className="border-b border-stone-200 bg-white" aria-label="What is included">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-stone-200 md:grid-cols-5 md:divide-y-0 px-6 md:px-12 lg:px-24">
        {proofPoints.map(({ icon: Icon, label }) => (
          <div key={label} className="flex min-h-28 items-center gap-3 px-4 py-6 first:pl-0 md:flex-col md:justify-center md:gap-2 md:px-5 md:text-center">
            <Icon size={21} strokeWidth={1.5} className="shrink-0 text-(--copper)" />
            <span className="text-xs font-semibold leading-snug text-zinc-700">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

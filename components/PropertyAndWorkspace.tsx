import { BadgeCheck, BriefcaseBusiness, Gauge, MapPinned } from "lucide-react";
import Image from "next/image";

const details = [
  [MapPinned, "Varkala, Kerala", "Bookable retreat location"],
  [BriefcaseBusiness, "Dedicated workspace", "Ergonomic desk for focused work"],
  [Gauge, "Primary + backup internet", "Speed test shared before payment"],
  [BadgeCheck, "Property details", "Confirmed room and workspace photos shared before payment"],
] as const;

export default function PropertyAndWorkspace() {
  return (
    <section className="border-t border-stone-200 bg-white px-6 py-20 md:px-12 md:py-24 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-(--copper)">VARKALA PROPERTY &amp; WORKSPACE</p>
          <h2 className="max-w-xl font-serif text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">A place you can actually work from.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
            The October retreat is based in Varkala, Kerala. The exact property, room category, workspace photos, measured internet speed, and airport route are shared with guests before the deposit is paid.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {details.map(([Icon, title, description]) => (
              <div key={title} className="border-l-2 border-(--copper) bg-[#fefbf7] px-4 py-4">
                <Icon size={19} className="mb-3 text-(--copper)" />
                <p className="text-sm font-bold text-zinc-900">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-xl">
          <Image src="/houseboat.jpg" alt="Kerala reference image for the Varkala retreat" fill className="object-cover" />
          <div className="absolute inset-x-4 bottom-4 bg-black/65 px-4 py-3 text-xs leading-relaxed text-white backdrop-blur-sm">
            Kerala reference image. The confirmed Varkala property and workspace photographs are provided before payment.
          </div>
        </div>
      </div>
    </section>
  );
}

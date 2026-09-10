import { ArrowRight, Users, CalendarRange, Building2 } from "lucide-react";

const benefits = [
  [Users, "Teams of 5–50", "For remote-first startups, agencies, and distributed teams."],
  [CalendarRange, "Custom dates", "Build a focused offsite around your team calendar."],
  [Building2, "Private program", "Dedicated coordination, venue planning, and team experiences."],
] as const;

export default function TeamOffsite() {
  return (
    <section className="border-t border-stone-200 bg-(--basalt) px-6 py-20 text-white md:px-12 md:py-24 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-(--copper-light)">TEAM OFFSITE</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight md:text-5xl">A separate path for distributed teams.</h2>
          <p className="mt-5 text-sm leading-relaxed text-zinc-300 md:text-base">Plan a private workation for a remote-first startup, agency, or distributed team of 5–50. We handle the venue, program, local transport, and team experiences around your working hours.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map(([Icon, title, description]) => (
            <div key={title} className="border border-white/10 bg-white/5 p-5">
              <Icon size={20} className="mb-5 text-(--copper-light)" />
              <p className="font-serif text-lg font-bold">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
        <a href="mailto:contact@syncretreat.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--copper) px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-(--copper-dark)">Plan a team offsite <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

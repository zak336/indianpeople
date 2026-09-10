const schedule = [
  ["8:00 AM", "Breakfast"],
  ["9:00 AM–1:00 PM", "Focused work"],
  ["1:00 PM", "Lunch or reset"],
  ["2:00–5:00 PM", "Focused work"],
  ["Evening", "Community session, beach, yoga, or local activity"],
];

export default function TypicalDay() {
  return (
    <section className="border-t border-stone-200 bg-[#fefbf7] px-6 py-20 md:px-12 md:py-24 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-(--copper)">A TYPICAL DAY</p>
          <h2 className="max-w-md font-serif text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">A rhythm that protects your workday.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">Work hours stay predictable. The coast, community, and local experiences fit around the hours when your clients and team need you.</p>
        </div>
        <div className="border-y border-stone-300">
          {schedule.map(([time, activity]) => (
            <div key={time} className="grid grid-cols-[minmax(110px,0.5fr)_1fr] gap-4 border-b border-stone-200 py-5 last:border-b-0 md:grid-cols-[180px_1fr]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--copper)">{time}</span>
              <span className="text-sm font-medium text-zinc-800 md:text-base">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unavailable in your region | Sync Retreat",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeoBlockedPage() {
  return (
    <div className="min-h-screen bg-(--basalt) text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <span className="text-xs font-mono tracking-[0.4em] text-(--copper) uppercase mb-6 block">
          Restricted Access
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
          Exclusive to India.
        </h1>
        <p className="text-zinc-400 font-sans leading-relaxed mb-10">
          Sync Retreat experiences and facilities are currently strictly available to residents of India. We are not accepting international applications or traffic at this time.
        </p>
        <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
          SyncRetreat LLP.
        </p>
      </div>
    </div>
  );
}

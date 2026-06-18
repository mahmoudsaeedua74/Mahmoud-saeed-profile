'use client';

import { platformColor } from '@/app/data/store-projects';
import { storeLabels } from '@/lib/store-labels';

type Accent = 'indigo' | 'violet';

const accents: Record<Accent, { mesh: string; ring: string; glow: string }> = {
  indigo: {
    mesh: 'from-indigo-600/25 via-violet-900/40 to-[#0a0f1a]',
    ring: 'border-indigo-400/35',
    glow: 'bg-indigo-500/20',
  },
  violet: {
    mesh: 'from-violet-600/25 via-fuchsia-900/35 to-[#0a0f1a]',
    ring: 'border-violet-400/35',
    glow: 'bg-violet-500/20',
  },
};

type Props = {
  title: string;
  themeSlug: string;
  accent?: Accent;
};

export default function ThemeComingSoonPreview({
  title,
  themeSlug,
  accent = 'indigo',
}: Props) {
  const palette = accents[accent];
  const color = platformColor.zid;

  return (
    <div
      className={`relative flex h-56 shrink-0 flex-col items-center justify-center overflow-hidden rounded-t-2xl border-b border-white/8 bg-gradient-to-br ${palette.mesh} sm:h-64 md:h-72`}
      aria-hidden
    >
      <div
        className={`pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full blur-3xl ${palette.glow}`}
      />
      <div
        className={`pointer-events-none absolute -bottom-12 -start-8 h-36 w-36 rounded-full blur-3xl ${palette.glow}`}
      />

      <div
        className={`relative mx-4 w-full max-w-[280px] rounded-2xl border ${palette.ring} bg-black/25 px-6 py-8 text-center backdrop-blur-md`}
      >
        <span className="type-kicker mb-3 block text-indigo-300/90">
          {storeLabels.themeMarketplace}
        </span>

        <p className="text-[clamp(1.75rem,5vw,2.25rem)] font-black leading-none text-white">
          {title}
        </p>
        <p className="mt-2 font-mono text-sm tracking-[0.2em] text-slate-400 lowercase">
          {themeSlug}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span
            className="type-body-sm rounded-full border border-white/10 px-2.5 py-1 font-bold"
            style={{ background: `${color}22`, color }}
          >
            {storeLabels.platformZid}
          </span>
          <span className="type-body-sm rounded-full border border-amber-400/35 bg-amber-500/15 px-2.5 py-1 font-bold text-amber-200">
            {storeLabels.themeInDevelopment}
          </span>
        </div>

        <p className="type-body-sm mt-4 leading-relaxed text-slate-300/90">
          {storeLabels.themePublishingSoon}
        </p>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Background from '@/app/components/Background';
import ContactSection from '@/app/components/ContactSection';
import ModificationCompare from '@/app/components/store/ModificationCompare';
import StorefrontPreview from '@/app/components/store/StorefrontPreview';
import {
  getBeforeAfterComparisons,
  getFinalStoreShowcases,
  getStoreProjectDetail,
} from '@/app/data/store-project-details';
import { getStoreProject, platformColor } from '@/app/data/store-projects';
import { en } from '@/lib/localized';
import { storeLabels } from '@/lib/store-labels';

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-indigo-400"
      aria-hidden
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StoreProjectDetailClient({ id }: { id: string }) {
  const d = storeLabels.projectDetail;
  const project = getStoreProject(id);
  const detail = getStoreProjectDetail(id);

  if (!project || !detail || (project.category !== 'css' && project.category !== 'sdk')) {
    notFound();
  }

  const platformLabel =
    project.platform === 'zid' ? storeLabels.platformZid : storeLabels.platformSalla;
  const color = platformColor[project.platform];
  const beforeAfterComparisons = getBeforeAfterComparisons(detail);
  const finalShowcases = getFinalStoreShowcases(detail);
  const categoryLabel = storeLabels.category[project.category];
  const detailBadge = project.category === 'sdk' ? d.badgeSdk : d.badgeCss;
  const detailNote = project.category === 'sdk' ? d.sdkNote : d.cssNote;

  return (
    <div className="relative min-h-screen bg-[#05070A] text-white">
      <Background />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:pt-32">
        <div className="wrap mx-auto max-w-[1080px]">
          <header className="mb-10 sm:mb-14">
            <span className="type-kicker mb-4 inline-block text-indigo-400">{detailBadge}</span>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="type-section-title font-black text-white">{project.title}</h1>
              <span className="type-body-sm pt-2 font-medium text-slate-500">{project.year}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="type-body-sm rounded-full border border-white/10 px-3 py-1 font-bold"
                style={{ background: `${color}22`, color }}
              >
                {platformLabel}
              </span>
              <span className="type-body-sm rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-slate-300">
                {categoryLabel}
              </span>
            </div>
          </header>

          <section className="mb-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6 sm:mb-12 sm:p-8">
            <h2 className="type-card-title mb-3 font-bold text-indigo-300">{d.whatWeDid}</h2>
            <p className="type-body leading-relaxed text-slate-300">{en(detail.summary)}</p>
            <p className="type-body-sm mt-4 border-t border-white/10 pt-4 text-slate-500">
              {detailNote}
            </p>
            {detail.scope && (
              <p className="type-body-sm mt-2 text-amber-200/80">{en(detail.scope)}</p>
            )}
          </section>

          {beforeAfterComparisons.length > 0 && (
            <section className="mb-10 sm:mb-12">
              <div className="mb-6 max-w-[640px]">
                <h2 className="type-section-title font-extrabold text-white">{d.compareTitle}</h2>
                <p className="type-body mt-2 text-slate-400">
                  {detail.compareIntro ? en(detail.compareIntro) : d.compareDesc}
                </p>
              </div>
              <div className="space-y-12 sm:space-y-16">
                {beforeAfterComparisons.map((comparison) => (
                  <div key={comparison.id}>
                    {(comparison.title || comparison.description) && (
                      <div className="mb-5 max-w-[640px]">
                        {comparison.title && (
                          <h3 className="type-card-title font-bold text-white">
                            {en(comparison.title)}
                          </h3>
                        )}
                        {comparison.description && (
                          <p className="type-body-sm mt-1.5 text-slate-400">
                            {en(comparison.description)}
                          </p>
                        )}
                      </div>
                    )}
                    <ModificationCompare comparison={comparison} projectTitle={project.title} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {finalShowcases.length > 0 && (
            <section className="mb-10 sm:mb-12">
              <div className="mb-6 max-w-[640px]">
                <h2 className="type-section-title font-extrabold text-white">{d.finalStoreTitle}</h2>
                <p className="type-body mt-2 text-slate-400">{d.finalStoreDesc}</p>
              </div>
              <div className="space-y-8">
                {finalShowcases.map((showcase) => (
                  <div key={showcase.id}>
                    {showcase.title && (
                      <h3 className="type-card-title mb-4 font-bold text-white">
                        {en(showcase.title)}
                      </h3>
                    )}
                    <StorefrontPreview
                      src={showcase.image}
                      alt={`${project.title} — ${d.finalStoreTitle}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {detail.improvements.length > 0 && (
            <section className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h2 className="type-card-title mb-6 font-bold text-white">{d.improvements}</h2>
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {detail.improvements.map((item) => (
                  <li
                    key={en(item)}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3.5"
                  >
                    <CheckIcon />
                    <span className="type-body-sm text-slate-300">{en(item)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.link && (
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="type-btn inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 font-bold text-white shadow-[0_8px_28px_rgba(79,70,229,0.4)] transition hover:bg-indigo-500"
              >
                {d.visitStore}
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/projects"
                className="type-btn inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 font-bold text-white transition hover:border-indigo-500/40"
              >
                {d.backProjects}
              </Link>
            </div>
          )}
        </div>
      </main>

      <ContactSection />
    </div>
  );
}

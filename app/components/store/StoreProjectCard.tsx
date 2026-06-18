'use client';

import Link from 'next/link';
import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { hasStoreProjectDetail } from '@/app/data/store-project-details';
import { platformColor, type StoreProject } from '@/app/data/store-projects';
import { resolveProjectImage } from '@/lib/project-image';
import { storeLabels } from '@/lib/store-labels';
import ThemeComingSoonPreview from './ThemeComingSoonPreview';
import SdkComingSoonPreview from './SdkComingSoonPreview';

function ProjectScreenshot({
  src,
  alt,
  disabled,
}: {
  src: string;
  alt: string;
  disabled?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const inViewRef = useRef(false);
  const coarseRef = useRef(false);

  const getDistance = useCallback(() => {
    const vp = viewportRef.current;
    const img = imgRef.current;
    if (!vp || !img) return 0;
    return img.offsetHeight - vp.offsetHeight;
  }, []);

  const scrollPreview = useCallback(() => {
    if (disabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const img = imgRef.current;
    const distance = getDistance();
    if (!img || distance <= 8) return;

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(img, {
      y: -distance,
      duration: Math.min(14, Math.max(5, distance / 80)),
      ease: 'none',
    });
  }, [disabled, getDistance]);

  const resetPreview = useCallback(() => {
    tweenRef.current?.kill();
    if (imgRef.current) {
      gsap.to(imgRef.current, { y: 0, duration: 0.9, ease: 'power2.out' });
    }
  }, []);

  const maybeAutoScroll = useCallback(() => {
    if (coarseRef.current && inViewRef.current) scrollPreview();
  }, [scrollPreview]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const updatePointer = () => {
      coarseRef.current = mq.matches;
    };
    updatePointer();
    mq.addEventListener('change', updatePointer);

    const el = viewportRef.current;
    if (!el || disabled) {
      return () => mq.removeEventListener('change', updatePointer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!coarseRef.current) return;
        if (entry.isIntersecting) {
          requestAnimationFrame(() => maybeAutoScroll());
        } else {
          resetPreview();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      mq.removeEventListener('change', updatePointer);
      observer.disconnect();
      tweenRef.current?.kill();
    };
  }, [disabled, maybeAutoScroll, resetPreview]);

  const onMouseEnter = () => {
    if (!coarseRef.current) scrollPreview();
  };

  const onMouseLeave = () => {
    if (!coarseRef.current) resetPreview();
  };

  return (
    <div
      ref={viewportRef}
      className="relative h-56 shrink-0 overflow-hidden rounded-t-2xl bg-[#0a0f1a] sm:h-64 md:h-72"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute start-0 top-0 block w-full max-w-none"
        draggable={false}
        loading="lazy"
        onLoad={maybeAutoScroll}
      />
    </div>
  );
}

type Props = {
  project: StoreProject;
};

export default function StoreProjectCard({ project }: Props) {
  const categoryLabel = storeLabels.category[project.category];
  const platformLabel =
    project.platform === 'zid' ? storeLabels.platformZid : storeLabels.platformSalla;
  const color = platformColor[project.platform];
  const canVisit = Boolean(project.link && project.link !== '#' && !project.comingSoon);
  const isThemeComingSoon = project.comingSoon && project.category === 'theme';
  const isSdkComingSoon = project.comingSoon && project.category === 'sdk';
  const isPlaceholderPreview = isThemeComingSoon || isSdkComingSoon;
  const hasPreview =
    (project.category === 'css' || project.category === 'sdk') &&
    hasStoreProjectDetail(project.id) &&
    canVisit;

  const inner = (
    <article
      className={`store-project-card flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.03] shadow-lg transition-[border-color,box-shadow] duration-300 ${
        isPlaceholderPreview
          ? 'border-dashed border-indigo-500/25 hover:border-indigo-500/45 hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)]'
          : 'border-white/10 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)]'
      }`}
    >
      <div className="relative overflow-hidden">
        {isThemeComingSoon ? (
          <ThemeComingSoonPreview
            title={project.title}
            themeSlug={project.themeSlug ?? project.id}
            accent={project.id === 'zayn' ? 'violet' : 'indigo'}
          />
        ) : isSdkComingSoon ? (
          <SdkComingSoonPreview
            title={project.title}
            sdkSlug={project.id}
            accent={project.id === 'furniture' ? 'amber' : 'indigo'}
          />
        ) : (
          <ProjectScreenshot
            src={resolveProjectImage(project.screenshot)}
            alt={project.title}
            disabled={project.comingSoon}
          />
        )}
        {project.comingSoon && !isPlaceholderPreview && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35">
            <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-4 py-1.5 text-sm font-bold text-amber-200">
              {storeLabels.comingSoon}
            </span>
          </span>
        )}
        {hasPreview && (
          <div
            className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full gap-2 px-4 pb-4 pt-12 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
            style={{
              background:
                'linear-gradient(to top, rgba(10,15,26,0.98) 0%, rgba(10,15,26,0.88) 55%, transparent 100%)',
            }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="type-btn flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-lg transition hover:bg-indigo-500"
            >
              {storeLabels.previewWork}
            </Link>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="type-btn flex flex-1 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-center text-sm font-bold text-white backdrop-blur-sm transition hover:border-indigo-400/50 hover:bg-white/15"
            >
              {storeLabels.visitStore}
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="type-card-title font-bold text-white transition group-hover:text-indigo-300">
            {project.title}
          </h3>
          <span className="type-body-sm shrink-0 pt-1 font-medium text-slate-500">{project.year}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className="type-body-sm rounded-full border border-white/10 px-2.5 py-1 font-bold tracking-wide"
            style={{ background: `${color}22`, color }}
          >
            {platformLabel}
          </span>
          <span className="type-body-sm rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-semibold text-slate-300">
            {categoryLabel}
          </span>
        </div>

        <p className="type-body-sm leading-relaxed text-slate-400">{project.tag}</p>

        {(isThemeComingSoon || isSdkComingSoon) && (
          <p className="mt-auto pt-1 text-xs font-semibold tracking-wider text-amber-300/90">
            {storeLabels.comingSoon}
          </p>
        )}

        {canVisit && !hasPreview && (
          <p className="mt-auto pt-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            {storeLabels.visitStore} →
          </p>
        )}
      </div>
    </article>
  );

  if (canVisit && !hasPreview) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {inner}
      </a>
    );
  }

  return <div className="group block h-full">{inner}</div>;
}

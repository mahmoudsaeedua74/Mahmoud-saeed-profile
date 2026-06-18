'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { resolveProjectImage } from '@/lib/project-image';
import { storeLabels } from '@/lib/store-labels';

function ScrollHint({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/90 to-transparent pb-3 pt-12"
      aria-hidden
    >
      <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-white/20 bg-black/55 text-white/90 shadow-lg backdrop-blur-sm">
        <ChevronDown size={20} strokeWidth={2.5} />
      </span>
    </div>
  );
}

function FitPanel({
  src,
  alt,
  label,
  labelClass,
  borderClass,
}: {
  src: string;
  alt: string;
  label: string;
  labelClass: string;
  borderClass: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = useCallback(() => {
    const vp = viewportRef.current;
    const img = imgRef.current;
    if (!vp || !img || !isTouch) {
      setShowScrollHint(false);
      return;
    }
    const scrollable = img.offsetHeight - vp.clientHeight > 12;
    const atBottom = vp.scrollTop + vp.clientHeight >= img.offsetHeight - 12;
    const hasScrolled = vp.scrollTop > 20;
    setShowScrollHint(scrollable && !atBottom && !hasScrolled);
  }, [isTouch]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !isTouch) {
      setShowScrollHint(false);
      return;
    }
    const onScroll = () => updateScrollHint();
    vp.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollHint);
    return () => {
      vp.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollHint);
    };
  }, [isTouch, updateScrollHint]);

  return (
    <div className="flex flex-col">
      <span className={`type-body-sm mb-2 font-bold uppercase tracking-wider ${labelClass}`}>
        {label}
      </span>
      <div
        ref={viewportRef}
        className={`relative rounded-2xl border bg-[#0a0f1a] shadow-lg ${borderClass} ${
          isTouch
            ? 'max-h-[min(70vh,560px)] touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'overflow-hidden'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={resolveProjectImage(src)}
          alt={alt}
          className="block h-auto w-full"
          draggable={false}
          loading="lazy"
          onLoad={updateScrollHint}
        />
        <ScrollHint visible={isTouch && showScrollHint} />
      </div>
    </div>
  );
}

function ComparePanel({
  src,
  alt,
  label,
  labelClass,
  frameClass,
  borderClass,
  fitContent = false,
}: {
  src: string;
  alt: string;
  label: string;
  labelClass: string;
  frameClass: string;
  borderClass: string;
  fitContent?: boolean;
}) {
  if (fitContent) {
    return (
      <FitPanel src={src} alt={alt} label={label} labelClass={labelClass} borderClass={borderClass} />
    );
  }

  return (
    <ScrollComparePanel
      src={src}
      alt={alt}
      label={label}
      labelClass={labelClass}
      frameClass={frameClass}
      borderClass={borderClass}
    />
  );
}

function ScrollComparePanel({
  src,
  alt,
  label,
  labelClass,
  frameClass,
  borderClass,
}: {
  src: string;
  alt: string;
  label: string;
  labelClass: string;
  frameClass: string;
  borderClass: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const coarseRef = useRef(false);
  const [isTouch, setIsTouch] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = useCallback(() => {
    const vp = viewportRef.current;
    const img = imgRef.current;
    if (!vp || !img || !coarseRef.current) {
      setShowScrollHint(false);
      return;
    }
    const scrollable = img.offsetHeight - vp.clientHeight > 12;
    const atBottom = vp.scrollTop + vp.clientHeight >= img.offsetHeight - 12;
    const hasScrolled = vp.scrollTop > 20;
    setShowScrollHint(scrollable && !atBottom && !hasScrolled);
  }, []);

  const getDistance = useCallback(() => {
    const vp = viewportRef.current;
    const img = imgRef.current;
    if (!vp || !img) return 0;
    return img.offsetHeight - vp.offsetHeight;
  }, []);

  const scrollPreview = useCallback(() => {
    if (coarseRef.current) return;
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
  }, [getDistance]);

  const resetPreview = useCallback(() => {
    tweenRef.current?.kill();
    if (imgRef.current) {
      gsap.to(imgRef.current, { y: 0, duration: 0.9, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const updatePointer = () => {
      coarseRef.current = mq.matches;
      setIsTouch(mq.matches);
      if (mq.matches) {
        tweenRef.current?.kill();
        if (imgRef.current) gsap.set(imgRef.current, { y: 0 });
      }
    };
    updatePointer();
    mq.addEventListener('change', updatePointer);
    return () => {
      mq.removeEventListener('change', updatePointer);
      tweenRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !isTouch) {
      setShowScrollHint(false);
      return;
    }

    const onScroll = () => updateScrollHint();
    vp.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollHint);

    return () => {
      vp.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollHint);
    };
  }, [isTouch, updateScrollHint]);

  const onMouseEnter = () => {
    if (!coarseRef.current) scrollPreview();
  };

  const onMouseLeave = () => {
    if (!coarseRef.current) resetPreview();
  };

  return (
    <div className="flex min-h-0 flex-col">
      <span className={`type-body-sm mb-2 font-bold uppercase tracking-wider ${labelClass}`}>
        {label}
      </span>
      <div
        ref={viewportRef}
        className={`relative min-h-0 rounded-2xl border bg-[#0a0f1a] shadow-lg ${frameClass} ${borderClass} ${
          isTouch
            ? 'touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'overflow-hidden'
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={resolveProjectImage(src)}
          alt={alt}
          className={
            isTouch
              ? 'block w-full max-w-none'
              : 'absolute start-0 top-0 block w-full max-w-none'
          }
          draggable={false}
          loading="lazy"
          onLoad={updateScrollHint}
        />
        <ScrollHint visible={isTouch && showScrollHint} />
      </div>
    </div>
  );
}

type Props = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt: string;
  compact?: boolean;
  fitContent?: boolean;
};

export default function ProjectCompare({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  compact = false,
  fitContent = false,
}: Props) {
  const c = storeLabels.projectDetail.compare;

  const frameHeight = fitContent
    ? ''
    : compact
      ? 'h-[min(420px,55vh)] sm:h-[min(480px,60vh)]'
      : 'h-[min(520px,65vh)] sm:h-[min(600px,72vh)] lg:h-[min(680px,75vh)]';

  const placeholderHeight = fitContent ? 'min-h-[200px]' : frameHeight;

  return (
    <div className="grid items-start gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
      <div className="flex flex-col">
        {beforeSrc ? (
          <ComparePanel
            src={beforeSrc}
            alt={beforeAlt}
            label={c.before}
            labelClass="text-slate-500"
            frameClass={frameHeight}
            borderClass="border-white/10"
            fitContent={fitContent}
          />
        ) : (
          <>
            <span className="type-body-sm mb-2 font-bold uppercase tracking-wider text-slate-500">
              {c.before}
            </span>
            <div
              className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-6 text-center ${placeholderHeight}`}
            >
              <span className="mb-2 text-4xl opacity-40" aria-hidden>
                ◫
              </span>
              <p className="type-body-sm font-semibold text-slate-400">{c.beforePlaceholder}</p>
              <p className="mt-1 text-xs text-slate-600">{c.beforeHint}</p>
            </div>
          </>
        )}
      </div>

      {afterSrc ? (
        <ComparePanel
          src={afterSrc}
          alt={afterAlt}
          label={c.after}
          labelClass="text-indigo-400"
          frameClass={frameHeight}
          borderClass="border-indigo-500/30 ring-1 ring-indigo-500/20 shadow-[0_20px_50px_rgba(79,70,229,0.12)]"
          fitContent={fitContent}
        />
      ) : null}
    </div>
  );
}

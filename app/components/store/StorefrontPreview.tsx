'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { resolveProjectImage } from '@/lib/project-image';

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

type Props = {
  src: string;
  alt: string;
};

export default function StorefrontPreview({ src, alt }: Props) {
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

  return (
    <div
      ref={viewportRef}
      className={`relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#0a0f1a] shadow-[0_20px_50px_rgba(79,70,229,0.12)] ring-1 ring-indigo-500/20 ${
        isTouch
          ? 'max-h-[min(72vh,680px)] touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'h-[min(520px,65vh)] sm:h-[min(600px,72vh)] lg:h-[min(680px,75vh)]'
      }`}
      onMouseEnter={() => {
        if (!coarseRef.current) scrollPreview();
      }}
      onMouseLeave={() => {
        if (!coarseRef.current) resetPreview();
      }}
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
  );
}

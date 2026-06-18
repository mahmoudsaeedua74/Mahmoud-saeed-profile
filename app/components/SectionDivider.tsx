'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SectionDividerProps = {
  className?: string;
  intense?: boolean;
};

export default function SectionDivider({ className = '', intense = false }: SectionDividerProps) {
  const root = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 94%', once: true },
        });

        tl.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power3.inOut' }
        ).fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.5)' },
          '-=0.45'
        );

        if (intense && glowRef.current) {
          tl.fromTo(
            glowRef.current,
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
          );
        }
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={`relative z-10 flex items-center justify-center px-5 py-6 md:py-10 ${className}`}
      aria-hidden
    >
      {intense && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-24 w-24 rounded-full bg-indigo-600/10 blur-3xl opacity-0"
        />
      )}
      <div
        ref={lineRef}
        className={`h-px w-full max-w-[min(92%,800px)] origin-center scale-x-0 bg-gradient-to-r from-transparent to-transparent ${
          intense
            ? 'via-indigo-400/70'
            : 'via-indigo-500/40'
        }`}
      />
      <div
        ref={dotRef}
        className={`absolute rounded-full opacity-0 ${
          intense
            ? 'h-2 w-2 bg-indigo-400 shadow-[0_0_16px_#818cf8]'
            : 'h-1.5 w-1.5 bg-indigo-500/80 shadow-[0_0_10px_#6366f1]'
        }`}
      />
    </div>
  );
}

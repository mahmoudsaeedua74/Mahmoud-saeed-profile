'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import Background from './Background';

gsap.registerPlugin(useGSAP);

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(logoRef.current, { scale: 0.85, opacity: 0, duration: 0.35, ease: 'power2.out' }).from(
        textRef.current,
        { y: 16, opacity: 0, duration: 0.35 },
        '-=0.15'
      );

      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 2.5,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(dotRef.current, {
        scale: 1.12,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      tl.to(
        orbitRef.current,
        {
          rotate: 3600,
          duration: 1.8,
          ease: 'power4.in',
        },
        0.45
      );

      tl.to(
        logoRef.current,
        {
          x: 'random(-2, 2)',
          y: 'random(-2, 2)',
          rotate: 'random(-1, 1)',
          duration: 0.06,
          repeat: 10,
          yoyo: true,
          ease: 'none',
        },
        1.5
      );

      gsap.to(textRef.current, {
        opacity: 0.5,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden px-4"
    >
      <Background />

      <div className="relative z-10 w-full max-w-[min(92vw,520px)]" style={{ perspective: '1000px' }}>
        <div ref={logoRef} className="relative z-10 mx-auto w-[clamp(132px,38vw,360px)]">
          <Image
            src="/logo2.png"
            alt="Mahmoud Saeed"
            width={400}
            height={400}
            priority
            sizes="(max-width: 640px) 38vw, (max-width: 1024px) 240px, 360px"
            className="h-auto w-full rounded-lg"
          />
        </div>

        <div
          ref={orbitRef}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[clamp(188px,54vw,500px)] w-[clamp(188px,54vw,500px)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div ref={dotRef} className="relative">
              <div className="absolute inset-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-xl sm:h-10 sm:w-10 md:h-12 md:w-12" />
              <div className="absolute inset-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/60 blur-md sm:h-7 sm:w-7 md:h-9 md:w-9" />
              <div
                className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600 sm:h-6 sm:w-6 md:h-8 md:w-8"
                style={{ boxShadow: '0 0 12px #4F46E5, 0 0 24px rgba(79, 70, 229, 0.65)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-10 w-full max-w-xs -translate-x-1/2 px-4 sm:bottom-16 md:bottom-20"
      >
        <p className="text-center text-[11px] font-light tracking-[0.22em] text-indigo-400 sm:text-sm sm:tracking-[0.28em] md:text-lg md:tracking-[0.3em]">
          LOADING
        </p>
      </div>
    </div>
  );
}

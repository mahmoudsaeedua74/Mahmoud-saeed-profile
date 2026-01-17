'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import Background from './Background';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Entrance
    tl.from(logoRef.current, { scale: 0.8, opacity: 0, duration: 0.5, ease: 'power2.out' })
      .from(textRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');

    // Orbit animation
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    // Pulse effect for dot
    gsap.to(dotRef.current, {
      scale: 1.15,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Accelerated orbit and shake effect
    tl.to(orbitRef.current, {
      rotate: 3600,
      duration: 5,
      ease: 'power4.in',
    }, 1);

    tl.to(logoRef.current, {
      x: 'random(-2, 2)',
      y: 'random(-2, 2)',
      rotate: 'random(-1, 1)',
      duration: 0.1,
      repeat: 20,
      yoyo: true,
      ease: 'none',
    }, 4);

    // Text pulse
    gsap.to(textRef.current, {
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Same animated background */}
      <Background />

      {/* Loading content on top of background */}
      <div className="relative z-10" style={{ perspective: '1000px' }}>
        <div ref={logoRef} className="relative z-10">
          <Image
            src="/logo2.png"
            alt="Mahmoud Saeed Logo"
            width={400}
            height={400}
            priority
            className="rounded-lg"
          />
        </div>

        <div
          ref={orbitRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: '500px', height: '500px' }}
        >
          <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div ref={dotRef} className="relative">
              <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl bg-indigo-600/30" />
              <div className="absolute inset-0 w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md bg-indigo-600/60" />
              <div
                className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
                style={{ boxShadow: '0 0 15px #4F46E5, 0 0 30px rgba(79, 70, 229, 0.7)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={textRef} className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <p className="text-lg font-light tracking-widest text-indigo-600">
          LOADING
        </p>
      </div>
    </div>
  );
}
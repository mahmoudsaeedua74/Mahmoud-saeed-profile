'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CodeAbout from '../CodeAbout';
import { RevealText } from '../anim';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const glow = sectionRef.current?.querySelector('.about-glow');
      if (!glow) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(glow, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="relative z-10 w-full py-20">
      <div className="about-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <div className="page-container">
        <div className="mb-12 md:mb-20 text-center">
          <RevealText
            text="About Me"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-['Belgrano']"
          />
          <div
            ref={lineRef}
            className="mx-auto h-1 w-24 origin-center rounded-full bg-indigo-500"
          />
        </div>

        {/* The GSAP Animated Code View */}
        <CodeAbout />
      </div>
    </section>
  );
}

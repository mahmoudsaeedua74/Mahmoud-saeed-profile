'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match) return;
      const [, prefix, numStr, suffix] = match;
      const target = parseInt(numStr, 10);

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  id?: string;
};

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  y = 26,
  delay = 0,
  duration = 0.7,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(el, {
          opacity: 0,
          y,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  start?: string;
  delay?: number;
  immediate?: boolean;
};

export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  start = 'top 85%',
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll('.rt-word');
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const anim = {
          yPercent: 70,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start, once: true } }),
        };
        gsap.from(targets, anim);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="rt-word inline-block">{w}</span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  stagger?: number;
  start?: string;
};

export function Stagger({
  children,
  className,
  as: Tag = 'div',
  y = 28,
  stagger = 0.1,
  start = 'top 82%',
}: StaggerProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.children) as HTMLElement[];
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(items, {
          opacity: 0,
          y,
          duration: 0.6,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

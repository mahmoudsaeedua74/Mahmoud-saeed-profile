'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_HOLD_S = 1.75;

interface SectionTitleProps {
  text: string;
  mobileText?: string;
  href?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function SectionTitle({
  text,
  mobileText,
  href,
  containerRef,
  className = '',
}: SectionTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const label = mobileText ?? text;

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const letters = titleRef.current.querySelectorAll('.section-title-letter');
      const viewAll = titleRef.current.querySelector('.section-view-all');
      const strokeTitle = titleRef.current.querySelector('.section-title-stroke') as HTMLElement;
      const whiteTitle = titleRef.current.querySelector('.section-title-white') as HTMLElement;

      if (!strokeTitle) return;

      let activeTl: gsap.core.Timeline | null = null;
      let scrollHoldTimer: gsap.core.Tween | null = null;
      let isPointerOver = false;

      const killActive = () => {
        activeTl?.kill();
        activeTl = null;
      };

      const clearScrollHold = () => {
        scrollHoldTimer?.kill();
        scrollHoldTimer = null;
      };

      const animateIn = () => {
        killActive();
        clearScrollHold();

        const tl = gsap.timeline();
        activeTl = tl;

        tl.to(strokeTitle, { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0);

        if (whiteTitle) {
          tl.to(whiteTitle, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1);
        }

        if (letters.length > 0) {
          tl.to(
            letters,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: { amount: 0.4, from: 'start', ease: 'power2.out' },
              ease: 'back.out(1.2)',
            },
            0.15
          );
        }

        if (viewAll && href) {
          tl.to(viewAll, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }, 0.4);
        }

        return tl;
      };

      const animateOut = () => {
        killActive();

        const tl = gsap.timeline();
        activeTl = tl;

        if (letters.length > 0) {
          tl.to(
            letters,
            {
              opacity: 0,
              y: -10,
              duration: 0.3,
              stagger: 0.015,
              ease: 'power2.in',
            },
            0
          );
        }

        if (whiteTitle) {
          tl.to(whiteTitle, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.1);
        }

        if (viewAll) {
          tl.to(viewAll, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' }, 0.1);
        }

        tl.to(strokeTitle, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2);

        return tl;
      };

      const scheduleScrollRevert = () => {
        clearScrollHold();
        scrollHoldTimer = gsap.delayedCall(SCROLL_HOLD_S, () => {
          if (!isPointerOver) animateOut();
        });
      };

      const titleButton = titleRef.current.querySelector('button') as HTMLElement;
      const hoverTarget = titleButton || titleRef.current;

      const handleMouseEnter = () => {
        isPointerOver = true;
        clearScrollHold();
        animateIn();
      };

      const handleMouseLeave = () => {
        isPointerOver = false;
        animateOut();
      };

      hoverTarget.addEventListener('mouseenter', handleMouseEnter);
      hoverTarget.addEventListener('mouseleave', handleMouseLeave);

      const triggerEl =
        containerRef?.current ?? titleRef.current.closest('section') ?? titleRef.current;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            if (isPointerOver) return;
            animateIn();
            scheduleScrollRevert();
          },
        });

        return () => st.kill();
      });

      return () => {
        mm.revert();
        killActive();
        clearScrollHold();
        hoverTarget.removeEventListener('mouseenter', handleMouseEnter);
        hoverTarget.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: titleRef }
  );

  const handleClick = () => {
    if (href) router.push(href);
  };

  const strokeHeading = (
    <>
      <h2
        className="section-title-stroke pointer-events-none text-center text-6xl font-black uppercase tracking-tighter transition-opacity duration-500 sm:text-7xl md:text-8xl"
        style={{
          WebkitTextStroke: '2px rgba(99, 102, 241, 0.4)',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {text}
      </h2>

      <div
        className="section-title-white pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <span className="flex text-6xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl">
          {text.split('').map((letter, idx) => (
            <span
              key={idx}
              className="section-title-letter inline-block"
              style={{
                willChange: 'transform, opacity',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      </div>

      {href && (
        <span
          className="section-view-all pointer-events-none mt-6 block text-center text-sm uppercase tracking-wider text-white transition-all duration-500"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          View All {label} →
        </span>
      )}
    </>
  );

  return (
    <div className={className}>
      <div ref={titleRef} className="hidden justify-center lg:flex">
        {href ? (
          <button
            type="button"
            onClick={handleClick}
            className="group/title relative block cursor-pointer border-none bg-transparent p-0"
          >
            {strokeHeading}
          </button>
        ) : (
          <div className="relative cursor-default">{strokeHeading}</div>
        )}
      </div>

      <h2 className="text-center text-4xl font-black uppercase tracking-tighter text-white md:text-6xl lg:hidden">
        {label}
      </h2>
    </div>
  );
}

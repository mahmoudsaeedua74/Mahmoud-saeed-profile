'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type InfiniteMarqueeProps = {
  children: ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  className?: string;
  gapClassName?: string;
  pauseOnHover?: boolean;
};

export default function InfiniteMarquee({
  children,
  direction = 'left',
  duration = 45,
  className = '',
  gapClassName = 'gap-6',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const half = track.scrollWidth / 2;
        const fromX = direction === 'left' ? 0 : -half;
        const toX = direction === 'left' ? -half : 0;

        gsap.set(track, { x: fromX });
        const tween = gsap.to(track, {
          x: toX,
          duration,
          ease: 'none',
          repeat: -1,
        });

        if (pauseOnHover && wrap) {
          const pause = () => tween.pause();
          const resume = () => tween.play();
          wrap.addEventListener('mouseenter', pause);
          wrap.addEventListener('mouseleave', resume);
          return () => {
            wrap.removeEventListener('mouseenter', pause);
            wrap.removeEventListener('mouseleave', resume);
          };
        }
      });

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [direction, duration] }
  );

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className={`flex w-max ${gapClassName}`}>
        <div className={`flex shrink-0 ${gapClassName}`}>{children}</div>
        <div className={`flex shrink-0 ${gapClassName}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

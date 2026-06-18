'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getLenis } from '@/lib/lenis';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      const doc = document.documentElement;
      if (!el) return;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrollTop = getLenis()?.scroll ?? doc.scrollTop;
      const p = max > 0 ? Math.min(1, scrollTop / max) : 0;
      el.style.transform = `scaleX(${p})`;
    };

    gsap.ticker.add(update);
    update();
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]" aria-hidden>
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#4F46E5,#818cf8)]"
      />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { markIntroDone } from '@/lib/intro';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';

gsap.registerPlugin(ScrollTrigger);

const LOADING_HOLD_MS = 1600;
const LOADING_FADE_MS = 0.4;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      const overlay = loadingOverlayRef.current;
      if (!overlay) {
        setIsLoading(false);
        setShowContent(true);
        markIntroDone();
        document.body.style.overflow = '';
        return;
      }

      gsap.to(overlay, {
        opacity: 0,
        scale: 1.06,
        filter: 'blur(12px)',
        duration: LOADING_FADE_MS,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsLoading(false);
          setShowContent(true);
          markIntroDone();
          document.body.style.overflow = '';
          window.dispatchEvent(new Event('resize'));
          requestAnimationFrame(() => ScrollTrigger.refresh());

          if (contentRef.current) {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
          }
        },
      });
    }, LOADING_HOLD_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070A]">
      <div
        ref={contentRef}
        style={{ opacity: showContent ? 1 : 0 }}
        className="h-full w-full"
        aria-hidden={isLoading}
      >
        <HomePage />
      </div>

      {isLoading && (
        <div
          ref={loadingOverlayRef}
          className="fixed inset-0 z-[9999] bg-[#05070A]"
          aria-live="polite"
          aria-busy="true"
        >
          <LoadingScreen />
        </div>
      )}
    </main>
  );
}

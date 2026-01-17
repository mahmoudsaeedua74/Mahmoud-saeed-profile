'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show loading screen initially, then fade out
    const timer = setTimeout(() => {
      if (loadingOverlayRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
          }
        });

        // 1. Fade out the loading overlay
        tl.to(loadingOverlayRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 1,
          ease: 'power2.inOut',
        });

        // 2. Simultaneously fade in the main content
        if (contentRef.current) {
          tl.to(contentRef.current, {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          }, '-=0.5'); // Start slightly before the overlay is fully gone
        }
      } else {
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      {/* 
          Main Content Container 
          Rendered from start but invisible for a smooth transition 
      */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="w-full h-full"
      >
        <HomePage />
      </div>

      {/* Loading Overlay - Must be ABOVE everything else */}
      {isLoading && (
        <div
          ref={loadingOverlayRef}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <LoadingScreen />
        </div>
      )}
    </main>
  );
}
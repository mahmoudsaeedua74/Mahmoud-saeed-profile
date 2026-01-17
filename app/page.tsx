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
    // Show loading screen initially, then fade out with smooth transition
    const timer = setTimeout(() => {
      if (loadingOverlayRef.current && contentRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
          }
        });

        // 1. Scale and fade out loading overlay with blur
        tl.to(loadingOverlayRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(20px)',
          duration: 1.2,
          ease: 'power3.inOut',
        });

        // 2. Fade in main content smoothly
        tl.to(contentRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.8'); // Start before overlay fully fades
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
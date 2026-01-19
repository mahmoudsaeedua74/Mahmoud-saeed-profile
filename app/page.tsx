'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we've already loaded before (in this session)
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore === 'true') {
      // Already loaded before, skip loading screen
      setIsLoading(false);
      setHasLoaded(true);
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1 });
      }
      return;
    }

    // First time loading - show loading screen
    const timer = setTimeout(() => {
      if (loadingOverlayRef.current && contentRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            setHasLoaded(true);
            // Mark as loaded in session storage
            sessionStorage.setItem('hasLoadedBefore', 'true');
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
        setHasLoaded(true);
        sessionStorage.setItem('hasLoadedBefore', 'true');
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
        style={{ opacity: hasLoaded ? 1 : 0 }}
        className="w-full h-full"
      >
        <HomePage />
      </div>

      {/* Loading Overlay - Must be ABOVE everything else */}
      {isLoading && (
        <div
          ref={loadingOverlayRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <LoadingScreen />
        </div>
      )}
    </main>
  );
}
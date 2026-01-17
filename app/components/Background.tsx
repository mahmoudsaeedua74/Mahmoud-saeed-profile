'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none opacity-0';
      particle.style.backgroundColor = '#4F46E5';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Random float animation
      gsap.to(particle, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        opacity: 'random(0.1, 0.4)',
        scale: 'random(0.5, 2)',
        duration: 'random(2, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden pointer-events-none"
    />
  );
}

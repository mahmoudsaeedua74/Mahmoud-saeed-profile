'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    // Create floating particles with variety
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none';
      
      // Random particle type
      const type = Math.random();
      
      if (type < 0.3) {
        // Type 1: Small dots with glow
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = '#6366f1';
        particle.style.boxShadow = `0 0 ${size * 3}px rgba(99, 102, 241, 0.8)`;
      } else if (type < 0.6) {
        // Type 2: Medium circles with gradient
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.4) 100%)';
        particle.style.boxShadow = `0 0 ${size * 4}px rgba(139, 92, 246, 0.6)`;
      } else if (type < 0.85) {
        // Type 3: Larger glowing orbs
        const size = Math.random() * 6 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, rgba(165, 180, 252, 0.9) 0%, rgba(99, 102, 241, 0.3) 100%)';
        particle.style.boxShadow = `0 0 ${size * 5}px rgba(165, 180, 252, 0.7), 0 0 ${size * 2}px rgba(99, 102, 241, 0.5)`;
        particle.style.filter = 'blur(0.5px)';
      } else {
        // Type 4: Stars/crosses
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = '#a5b4fc';
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        particle.style.boxShadow = `0 0 ${size * 4}px rgba(165, 180, 252, 0.9)`;
      }
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      
      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Enhanced animations based on type
      if (type < 0.3) {
        // Fast, short movements
        gsap.to(particle, {
          x: `random(-80, 80)`,
          y: `random(-80, 80)`,
          opacity: `random(0.3, 0.7)`,
          scale: `random(0.8, 1.3)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      } else if (type < 0.6) {
        // Medium movements with rotation
        gsap.to(particle, {
          x: `random(-120, 120)`,
          y: `random(-120, 120)`,
          opacity: `random(0.2, 0.6)`,
          scale: `random(0.7, 1.5)`,
          rotation: `random(-180, 180)`,
          duration: `random(5, 9)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 3,
        });
      } else if (type < 0.85) {
        // Slow, wide movements
        gsap.to(particle, {
          x: `random(-150, 150)`,
          y: `random(-150, 150)`,
          opacity: `random(0.15, 0.5)`,
          scale: `random(0.6, 1.8)`,
          duration: `random(7, 12)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 4,
        });
      } else {
        // Twinkling stars
        gsap.to(particle, {
          x: `random(-60, 60)`,
          y: `random(-60, 60)`,
          opacity: `random(0.4, 0.9)`,
          scale: `random(0.5, 1.2)`,
          rotation: `random(0, 360)`,
          duration: `random(2, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      }
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  // Animated gradient orbs
  useEffect(() => {
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');
    const orb3 = document.getElementById('orb-3');

    if (orb1 && orb2 && orb3) {
      // Orb 1 - Top left, slow movement
      gsap.to(orb1, {
        x: 'random(-150, 150)',
        y: 'random(-150, 150)',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Orb 2 - Bottom right, medium speed
      gsap.to(orb2, {
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Orb 3 - Center, fast movement
      gsap.to(orb3, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

      {/* Animated gradient orbs */}
      <div 
        id="orb-1"
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div 
        id="orb-2"
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div 
        id="orb-3"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Particles container (created dynamically) */}
      <div className="absolute inset-0" />
    </div>
  );
}
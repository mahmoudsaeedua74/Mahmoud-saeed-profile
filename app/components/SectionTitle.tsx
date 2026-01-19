'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  text: string;
  href?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function SectionTitle({ 
  text, 
  href, 
  containerRef,
  className = ''
}: SectionTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const titleContainerRef = containerRef || useRef<HTMLDivElement>(null);

  // Title hover animations
  useGSAP(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll('.section-title-letter');
    const viewAll = titleRef.current.querySelector('.section-view-all');
    const strokeTitle = titleRef.current.querySelector('.section-title-stroke') as HTMLElement;
    const whiteTitle = titleRef.current.querySelector('.section-title-white') as HTMLElement;

    // Animate letters on scroll - but keep them hidden initially (only show on hover)
    // Only if containerRef is provided
    if (titleContainerRef?.current && letters.length > 0) {
      gsap.fromTo(letters,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 0, // Keep hidden initially
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Title hover effects - ALWAYS set up, regardless of containerRef
    const titleButton = titleRef.current.querySelector('button') as HTMLElement;
    
    if (titleButton && strokeTitle) {
      const handleMouseEnter = () => {
        const hoverTl = gsap.timeline();
        
        // Fade out stroke title
        hoverTl.to(strokeTitle, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
        
        // Show white title container
        if (whiteTitle) {
          hoverTl.to(whiteTitle, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.1);
        }
        
        // Animate white letters with smooth stagger
        if (letters.length > 0) {
          hoverTl.to(letters, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: {
              amount: 0.4,
              from: 'start',
              ease: 'power2.out',
            },
            ease: 'back.out(1.2)',
          }, 0.15);
        }
        
        // Show "View All" text if href provided
        if (viewAll && href) {
          hoverTl.to(viewAll, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.4)',
          }, 0.4);
        }
      };

      const handleMouseLeave = () => {
        const leaveTl = gsap.timeline();
        
        // Hide white letters first
        if (letters.length > 0) {
          leaveTl.to(letters, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.in',
          }, 0);
        }
        
        // Hide white title
        if (whiteTitle) {
          leaveTl.to(whiteTitle, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          }, 0.1);
        }
        
        // Hide "View All"
        if (viewAll) {
          leaveTl.to(viewAll, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: 'power2.in',
          }, 0.1);
        }
        
        // Fade in stroke title
        leaveTl.to(strokeTitle, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.2);
      };

      titleButton.addEventListener('mouseenter', handleMouseEnter);
      titleButton.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        titleButton.removeEventListener('mouseenter', handleMouseEnter);
        titleButton.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, { scope: titleRef });

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div 
      ref={titleRef}
      className={`hidden lg:flex justify-center items-center ${className}`}
    >
      {href ? (
        <button
          onClick={handleClick}
          className="relative cursor-pointer block group/title bg-transparent border-none p-0"
        >
          {/* Background stroke text - DEFAULT: Always visible */}
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-center pointer-events-none section-title-stroke transition-opacity duration-500"
            style={{
              WebkitTextStroke: '2px rgba(99, 102, 241, 0.4)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            {text}
          </h2>
          
          {/* Foreground white text - Only visible on hover */}
          <div 
            className="absolute inset-0 flex justify-center items-center pointer-events-none section-title-white"
            aria-hidden="true"
            style={{ opacity: 0 }}
          >
            <span className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white flex">
              {text.split('').map((letter, idx) => (
                <span 
                  key={idx}
                  className="inline-block section-title-letter"
                  style={{ 
                    willChange: 'transform, opacity',
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </div>

          {/* "View All" text - Shows on hover BELOW white title (only if href provided) */}
          {href && (
            <span 
              className="block text-center text-sm text-white mt-6 uppercase tracking-wider pointer-events-none section-view-all transition-all duration-500"
              style={{ opacity: 0, transform: 'translateY(10px)' }}
            >
              View All {text} →
            </span>
          )}
        </button>
      ) : (
        <h2 
          className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-center pointer-events-none section-title-stroke transition-opacity duration-500"
          style={{
            WebkitTextStroke: '2px rgba(99, 102, 241, 0.4)',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          {text}
        </h2>
      )}
    </div>
  );
}

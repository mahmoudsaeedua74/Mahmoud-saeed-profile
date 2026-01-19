'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SectionTitle from '../SectionTitle';

gsap.registerPlugin(ScrollTrigger);

// Project data structure
interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  color: string;
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Dr. Games',
    slug: 'drgames',
    image: '/houses1.png',
    color: '#6366f1',
    description: 'Advanced Hybrid Gaming Marketplace'
  },
  {
    id: '2',
    title: 'Crawleo',
    slug: 'crawleo',
    image: '/houses1.png',
    color: '#10b981',
    description: 'Real-Time Web Intelligence API'
  },
  {
    id: '3',
    title: 'Invia',
    slug: 'invia',
    image: '/houses1.png',
    color: '#8b5cf6',
    description: 'Modern Logistics Platform'
  },
  {
    id: '4',
    title: '360 Home Offers',
    slug: '360homeoffers',
    image: '/houses1.png',
    color: '#f59e0b',
    description: 'Real Estate Platform Redesign'
  },
  {
    id: '5',
    title: 'Crettiva',
    slug: 'crettiva',
    image: '/houses1.png',
    color: '#ec4899',
    description: 'Digital Agency Portfolio'
  },
  {
    id: '6',
    title: 'Movie-Boi',
    slug: 'movie-boi-react-imdb-netflex-clone',
    image: '/houses1.png',
    color: '#ef4444',
    description: 'React-IMDB-Netflix Clone'
  },
  {
    id: '7',
    title: 'Al Manara',
    slug: 'almenara-furniture-transfer',
    image: '/houses1.png',
    color: '#06b6d4',
    description: 'E-commerce Furniture Platform'
  },
  {
    id: '8',
    title: "A'atene",
    slug: 'aatene-ecommerce',
    image: '/houses1.png',
    color: '#14b8a6',
    description: 'E-commerce Platform'
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Infinite slider animation and title animations
  useGSAP(() => {
    if (!sliderRef.current) return;

    const slides = sliderRef.current.querySelectorAll('.project-slide');
    const slidesArray = Array.from(slides);
    
    // Duplicate slides for seamless loop
    slidesArray.forEach((slide) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      sliderRef.current?.appendChild(clone);
    });

    const totalWidth = sliderRef.current.scrollWidth / 2; // Half because we duplicated
    const speed = 50; // pixels per second

    // Infinite scroll animation
    let animation = gsap.to(sliderRef.current, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
    });

    // Pause slider on hover over slider container
    const sliderContainer = containerRef.current?.querySelector('.slider-container') as HTMLElement;
    if (sliderContainer) {
      const pauseSlider = () => animation.pause();
      const playSlider = () => animation.play();
      
      sliderContainer.addEventListener('mouseenter', pauseSlider);
      sliderContainer.addEventListener('mouseleave', playSlider);
      
      // Store references for cleanup
      (sliderContainer as any).__pauseSlider = pauseSlider;
      (sliderContainer as any).__playSlider = playSlider;
    }

    // Cleanup function
    return () => {
      animation.kill();
      // Clean up slider container hover listeners
      if (sliderContainer && (sliderContainer as any).__pauseSlider) {
        sliderContainer.removeEventListener('mouseenter', (sliderContainer as any).__pauseSlider);
        sliderContainer.removeEventListener('mouseleave', (sliderContainer as any).__playSlider);
      }
    };
  }, { scope: containerRef });

  const handleProjectClick = (slug: string) => {
    router.push(`/project/${slug}`);
  };

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 pt-8  pb-20 relative z-10 w-full overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="relative mb-16 md:mb-24">
          <SectionTitle text="PROJECTS" href="/projects" containerRef={containerRef} />
          {/* Mobile title - Simple, no hover effects */}
          <h2 className="lg:hidden text-4xl md:text-6xl font-black text-white mb-4 text-center uppercase tracking-tighter">
            Projects
          </h2>
        </div>


        {/* Infinite Slider Container */}
        <div 
          className="slider-container w-full overflow-hidden pt-8 relative" 
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div 
            ref={sliderRef}
            className="flex will-change-transform select-none relative z-0 flex-row w-max"
            style={{ gap: '24px' }}
          >
            {/* Project Slides */}
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual Project Card Component
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const viewTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const viewText = viewTextRef.current;

    const handleMouseEnter = () => {
      // Remove grayscale and show color
      if (image) {
        gsap.to(image, {
          filter: 'grayscale(0%)',
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Show overlay
      if (overlay) {
        gsap.to(overlay, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Show title with "View Project" text
      if (title) {
        gsap.to(title, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      if (viewText) {
        gsap.to(viewText, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: 'power2.out',
        });
      }

      // Scale up card slightly
      gsap.to(card, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Add grayscale back
      if (image) {
        gsap.to(image, {
          filter: 'grayscale(100%)',
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Hide overlay
      if (overlay) {
        gsap.to(overlay, {
          y: '100%',
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Hide title
      if (title) {
        gsap.to(title, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (viewText) {
        gsap.to(viewText, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Reset scale
      gsap.to(card, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="project-slide relative w-[380px] h-[230px] rounded-2xl cursor-pointer py-6 overflow-hidden block shrink-0"
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {/* Project Image */}
        <img
          ref={imageRef}
          alt={project.title}
          src={project.image}
          className="object-cover rounded-2xl w-full h-full"
          style={{
            filter: 'grayscale(100%)',
            transition: 'filter 0.6s ease-out',
          }}
          loading="lazy"
        />

        {/* Overlay with description */}
        <div
          ref={overlayRef}
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            transform: 'translateY(100%)',
            opacity: 0,
          }}
        >
          <div 
            className="bg-black/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
            style={{ borderColor: `${project.color}40` }}
          >
            <h3 
              className="text-white text-xs font-bold uppercase leading-tight line-clamp-2 tracking-wide"
            >
              {project.title} | {project.description}
            </h3>
          </div>
        </div>

        {/* Title overlay on hover */}
        <div 
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-tighter">
            {project.title}
          </h3>
          <span 
            ref={viewTextRef}
            className="block text-sm font-normal normal-case mt-2 text-gray-300"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            View Project
          </span>
        </div>
      </div>

    </div>
  );
}

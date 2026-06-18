'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, Sparkles } from 'lucide-react';
import Background from '../components/Background';
import ContactSection from '../components/ContactSection';
import ProjectGridCard from '../components/ProjectGridCard';
import StoreProjectCard from '../components/store/StoreProjectCard';
import SectionDivider from '../components/SectionDivider';
import { Reveal, RevealText } from '../components/anim';
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from '@/app/data/projects';
import {
  filterStoreProjects,
  storeWorkFilters,
  type StoreWorkFilter,
} from '@/app/data/store-projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [storeWorkFilter, setStoreWorkFilter] = useState<StoreWorkFilter>('all');

  const isStoreCategory = activeCategory === 'zid' || activeCategory === 'salla';

  const filteredProjects = useMemo(() => {
    if (isStoreCategory) return [];
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, isStoreCategory]);

  const filteredStoreProjects = useMemo(() => {
    if (!isStoreCategory) return [];
    return filterStoreProjects(activeCategory, storeWorkFilter);
  }, [activeCategory, isStoreCategory, storeWorkFilter]);

  const gridItems = isStoreCategory ? filteredStoreProjects : filteredProjects;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.projects-hero-badge', {
          autoAlpha: 0,
          y: 24,
          scale: 0.92,
          duration: 0.7,
          ease: 'back.out(1.6)',
          delay: 0.15,
        });

        gsap.from('.projects-hero-desc', {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.55,
        });

        gsap.from('.projects-hero-scroll', {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.9,
        });

        if (heroRef.current) {
          gsap.to('.projects-orb-1', {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          });
          gsap.to('.projects-orb-2', {
            y: 160,
            x: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          });
          gsap.to('.projects-hero-content', {
            y: -60,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        gsap.to('.projects-scroll-chevron', {
          y: 8,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });

      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const onMove = (e: MouseEvent) => {
          const cx = (e.clientX / window.innerWidth - 0.5) * 2;
          const cy = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to('.projects-orb-1', { x: cx * 30, y: cy * 20, duration: 1.3, ease: 'power2.out' });
          gsap.to('.projects-orb-2', { x: cx * -22, y: cy * 28, duration: 1.3, ease: 'power2.out' });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });

      return () => mm.revert();
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.project-grid-card, .store-project-card');
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 48, rotateX: 8, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    },
    { scope: gridRef, dependencies: [activeCategory, storeWorkFilter, gridItems] }
  );

  const handleCategory = (id: ProjectCategory | 'all') => {
    if (id === activeCategory || !gridRef.current) {
      setActiveCategory(id);
      if (id !== 'zid' && id !== 'salla') setStoreWorkFilter('all');
      return;
    }

    const cards = gridRef.current.querySelectorAll('.project-grid-card, .store-project-card');
    gsap.to(cards, {
      autoAlpha: 0,
      y: 20,
      scale: 0.96,
      duration: 0.25,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(id);
        if (id !== 'zid' && id !== 'salla') setStoreWorkFilter('all');
      },
    });
  };

  const handleStoreWorkFilter = (id: StoreWorkFilter) => {
    if (id === storeWorkFilter || !gridRef.current) {
      setStoreWorkFilter(id);
      return;
    }

    const cards = gridRef.current.querySelectorAll('.store-project-card');
    gsap.to(cards, {
      autoAlpha: 0,
      y: 20,
      scale: 0.96,
      duration: 0.25,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => setStoreWorkFilter(id),
    });
  };

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#05070A] text-white">
      <Background />

      <button
        onClick={() => router.back()}
        className="cursor-target fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition hover:border-indigo-500/40"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#05070A] to-[#0f172a] pt-24 pb-16"
      >
        <div
          className="projects-orb-1 pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-indigo-600/12 blur-[100px]"
          aria-hidden
        />
        <div
          className="projects-orb-2 pointer-events-none absolute -right-24 bottom-1/4 h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          aria-hidden
        />

        <div className="projects-hero-content relative mx-auto flex w-full max-w-[1375px] flex-col items-center px-5 text-center md:px-10 lg:px-20">
          <span className="projects-hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-indigo-300">
            <Sparkles size={14} />
            Portfolio Showcase
          </span>

          <RevealText
            text="Evolution of My Work"
            as="h1"
            className="text-4xl font-extrabold leading-tight text-indigo-400 sm:text-5xl md:text-6xl lg:text-7xl"
            immediate
            delay={0.35}
          />

          <p className="projects-hero-desc mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Every project here tells a story — from polished frontends and scalable backends
            to full-stack platforms and custom themes on{' '}
            <span className="text-indigo-300">Zid</span> &{' '}
            <span className="text-indigo-300">Salla</span>. Scroll down, explore, and see
            what we can build together.
          </p>

          <div className="projects-hero-scroll mt-10 flex flex-col items-center gap-2 text-slate-500">
            <span className="text-xs uppercase tracking-[3px]">Explore below</span>
            <div className="projects-scroll-chevron flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/5">
              <ChevronDown size={18} className="text-indigo-400" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider intense />

      <section className="projects-work-section relative z-10" style={{ perspective: '1200px' }}>
        <div className="page-container py-5 lg:py-12">
          <div className="mb-10 text-center md:mb-14">
            <Reveal>
              <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[2px] text-indigo-400">
                Full Portfolio
              </span>
            </Reveal>
            <RevealText
              text="My Work"
              as="h2"
              className="text-3xl font-black uppercase tracking-tighter md:text-5xl"
            />
            <Reveal className="mx-auto mt-4 max-w-xl text-slate-400" delay={0.12}>
              Filter by specialty and dive into the details of each build.
            </Reveal>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategory(cat.id)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 md:px-5 ${
                    isActive
                      ? 'scale-105 border-indigo-500 bg-indigo-600 text-white shadow-[0_0_24px_rgba(79,70,229,0.35)]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:scale-[1.02] hover:border-indigo-500/30 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {isStoreCategory && (
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {storeWorkFilters.map((filter) => {
                const isActive = storeWorkFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleStoreWorkFilter(filter.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 md:px-5 ${
                      isActive
                        ? 'border-emerald-500/50 bg-emerald-600/20 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-emerald-500/30 hover:text-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="py-12 md:py-20">
            {gridItems.length > 0 ? (
              <div
                ref={gridRef}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-10"
              >
                {isStoreCategory
                  ? filteredStoreProjects.map((project) => (
                      <StoreProjectCard key={project.id} project={project} />
                    ))
                  : filteredProjects.map((project) => (
                      <ProjectGridCard key={project.id} project={project} />
                    ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                No projects in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />
      <ContactSection />
    </div>
  );
}

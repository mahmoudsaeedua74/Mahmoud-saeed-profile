'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import { projects, type Project } from '@/app/data/projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current;
          if (!track) return;

          const slides = gsap.utils.toArray<HTMLElement>('.proj-slide');
          const count = slides.length;

          const tween = gsap.to(track, {
            xPercent: -100 * (count - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * (count - 1)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (fillRef.current) {
                  gsap.set(fillRef.current, { scaleX: self.progress });
                }
              },
            },
          });

          slides.forEach((slide) => {
            const reveal = slide.querySelectorAll<HTMLElement>('.proj-reveal');
            gsap.from(reveal, {
              autoAlpha: 0,
              y: 60,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.07,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tween,
                start: 'left 78%',
                toggleActions: 'play none none reverse',
              },
            });

            const mock = slide.querySelector<HTMLElement>('.proj-mock');
            if (mock) {
              gsap.fromTo(
                mock,
                { xPercent: 14 },
                {
                  xPercent: -14,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: slide,
                    containerAnimation: tween,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                  },
                }
              );
            }
          });
        }
      );

      mm.add('(max-width: 767px)', () => {
        const slides = gsap.utils.toArray<HTMLElement>('.proj-slide');

        slides.forEach((slide) => {
          gsap.from(slide.querySelectorAll<HTMLElement>('.proj-reveal'), {
            autoAlpha: 0,
            y: 40,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: slide, start: 'top 82%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="projects"
      ref={root}
      className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_85%_-10%,#1e1b4b_0%,#05070A_60%)] text-white md:h-screen"
    >
      <div className="pointer-events-none absolute inset-x-0 top-8 z-[30] flex justify-center md:top-12">
        <div className="pointer-events-auto w-full">
          <SectionTitle
            text="PROJECTS"
            href="/projects"
            containerRef={root}
          />
          <h2 className="lg:hidden text-4xl md:text-6xl font-black text-white text-center uppercase tracking-tighter">
            Projects
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex flex-col md:h-screen md:flex-row md:flex-nowrap"
      >
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      <div className="page-container relative z-20 hidden pb-8 md:absolute md:inset-x-0 md:bottom-0 md:block">
        <div className="flex items-center gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              ref={fillRef}
              className="block h-full w-full origin-left scale-x-0 rounded-full bg-indigo-400"
            />
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 whitespace-nowrap text-[14px] font-bold text-indigo-400 transition-opacity hover:opacity-80"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectSlide({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const hasMedia = Boolean(project.video || project.image);

  return (
    <div className="proj-slide relative flex w-full shrink-0 items-center md:h-screen md:w-screen">
      <div className="page-container grid w-full items-center gap-9 py-16 md:grid-cols-2 md:gap-14 md:pt-36">
        <div className="proj-mock">
          <div className="proj-reveal relative mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a0f1a] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ms-3 h-5 w-full max-w-[220px] rounded-full bg-white/10" />
            </div>

            {hasMedia ? (
              <div className="aspect-video w-full overflow-hidden bg-black">
                {project.video ? (
                  <video
                    className="h-full w-full object-cover"
                    src={project.video}
                    poster={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            ) : (
              <div className="p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="h-4 w-20 rounded bg-white/20" />
                  <div className="flex gap-2.5">
                    <span className="h-3 w-10 rounded bg-white/10" />
                    <span className="h-3 w-10 rounded bg-white/10" />
                    <span className="h-3 w-10 rounded bg-white/10" />
                  </div>
                </div>
                <div
                  className="flex h-28 items-center rounded-xl px-5 sm:h-32"
                  style={{ background: project.gradient }}
                >
                  <div className="space-y-2">
                    <span className="block h-3.5 w-28 rounded bg-white/80" />
                    <span className="block h-3 w-20 rounded bg-white/55" />
                    <span className="mt-1 block h-6 w-20 rounded-md bg-white/90" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="rounded-lg bg-white/6 p-2.5">
                      <span className="block h-12 rounded bg-white/10" />
                      <span className="mt-2 block h-2.5 w-3/4 rounded bg-white/15" />
                      <span className="mt-1.5 block h-2.5 w-1/2 rounded bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:order-last">
          <div className="proj-reveal mb-4 flex items-center gap-3">
            <span className="text-[15px] font-bold text-indigo-400">
              {String(index + 1).padStart(2, '0')}
              <span className="text-white/35">
                {' '}
                / {String(total).padStart(2, '0')}
              </span>
            </span>
            <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[12px] font-medium text-indigo-300">
              {project.tag}
            </span>
          </div>

          <h3 className="proj-reveal text-[30px] font-black leading-tight sm:text-[42px]">
            {project.title}
          </h3>
          <p className="proj-reveal mt-3 max-w-[420px] text-[16px] leading-[1.9] text-white/75 sm:text-[17px]">
            {project.description}
          </p>

          <div className="proj-reveal mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {project.metrics.map((metric) => (
              <div key={metric.l}>
                <div className="text-[24px] font-extrabold text-white sm:text-[28px]">
                  {metric.v}
                </div>
                <div className="text-[13px] text-white/55">{metric.l}</div>
              </div>
            ))}
          </div>

          <Link
            href={`/project/${project.slug}`}
            className="proj-reveal mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-[0_8px_22px_rgba(79,70,229,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            View Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

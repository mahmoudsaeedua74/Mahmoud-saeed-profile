'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Layers,
  User,
} from 'lucide-react';
import Background from '@/app/components/Background';
import { getAdjacentProjects, getProjectBySlug } from '@/app/data/projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectViewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!project || !pageRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>('.pv-reveal');
      gsap.from(sections, {
        autoAlpha: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.pv-hero-item'), {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        });
      }
    },
    { scope: pageRef, dependencies: [project] }
  );

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070A] px-6 text-center text-white">
        <h1 className="text-3xl font-black">Project not found</h1>
        <p className="mt-3 text-slate-400">This project does not exist or was removed.</p>
        <button
          onClick={() => router.push('/#projects')}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-bold transition hover:bg-indigo-500"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#05070A] text-white">
      <Background />

      {/* Hero */}
      <section ref={heroRef} className="relative z-10 pt-28">
        <div className="wrap">
          <div className="pv-hero-item mb-6 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: `${project.color}50`,
                background: `${project.color}18`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
            <span className="text-sm text-slate-400">{project.projectType}</span>
          </div>

          <h1 className="pv-hero-item text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            {project.title}
          </h1>

          <p className="pv-hero-item mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {project.fullDescription}
          </p>

          <div className="pv-hero-item mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400" />
              {project.year}
            </span>
            <span className="inline-flex items-center gap-2">
              <User size={16} className="text-indigo-400" />
              {project.role}
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers size={16} className="text-indigo-400" />
              {project.projectType}
            </span>
          </div>

          <div className="pv-hero-item mt-10 grid grid-cols-3 gap-4 sm:max-w-lg">
            {project.metrics.map((metric) => (
              <div
                key={metric.l}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-extrabold text-white sm:text-3xl">{metric.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                  {metric.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap mt-14">
          <div
            className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            style={{ boxShadow: `0 30px 80px ${project.color}22` }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1180px) 100vw, 1180px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Case study */}
      <section ref={contentRef} className="relative z-10 py-20 md:py-28">
        <div className="wrap space-y-20">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'The Problem', body: project.problem },
              { title: 'The Solution', body: project.solution },
              { title: 'The Outcome', body: project.outcome },
            ].map((block) => (
              <article
                key={block.title}
                className="pv-reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
              >
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[2px] text-indigo-400">
                  {block.title}
                </h2>
                <p className="leading-relaxed text-slate-300">{block.body}</p>
              </article>
            ))}
          </div>

          <div className="pv-reveal grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-black uppercase tracking-tighter">
                Key Features
              </h2>
              <ul className="space-y-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-indigo-400"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-black uppercase tracking-tighter">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {project.gallery.length > 1 && (
            <div className="pv-reveal">
              <h2 className="mb-8 text-3xl font-black uppercase tracking-tighter">
                Gallery
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {project.gallery.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pv-reveal flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-bold shadow-[0_8px_22px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                View Live Project
                <ArrowUpRight size={18} />
              </a>
            )}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-4 font-bold transition hover:border-indigo-500/40 hover:bg-white/5"
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="relative z-10 border-t border-white/10 py-12">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/project/${prev.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-indigo-500/30 hover:bg-white/[0.05]"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500">
                Previous
              </span>
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xl font-bold">{prev.title}</span>
                <ArrowLeft
                  size={20}
                  className="shrink-0 text-indigo-400 transition group-hover:-translate-x-1"
                />
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/project/${next.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-right transition hover:border-indigo-500/30 hover:bg-white/[0.05] md:col-start-2"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500">
                Next
              </span>
              <div className="mt-2 flex items-center justify-between gap-4">
                <ArrowRight
                  size={20}
                  className="shrink-0 text-indigo-400 transition group-hover:translate-x-1"
                />
                <span className="text-xl font-bold">{next.title}</span>
              </div>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

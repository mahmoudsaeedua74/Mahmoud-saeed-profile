'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Project } from '@/app/data/projects';

function tiltCard(e: React.MouseEvent<HTMLElement>) {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(card, {
    rotateY: x * 10,
    rotateX: -y * 10,
    duration: 0.45,
    ease: 'power2.out',
    transformPerspective: 1000,
  });
  const img = card.querySelector('.proj-card-img');
  if (img) {
    gsap.to(img, { scale: 1.08, x: x * -12, y: y * -8, duration: 0.5, ease: 'power2.out' });
  }
}

function resetCard(e: React.MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.65, ease: 'power3.out' });
  const img = card.querySelector('.proj-card-img');
  if (img) {
    gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.65, ease: 'power3.out' });
  }
}

export default function ProjectGridCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  return (
    <Link
      href={`/project/${project.slug}`}
      className="project-grid-card group block h-full"
      style={{ perspective: '1100px' }}
    >
      <article
        ref={cardRef}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/70 bg-gray-900/50 shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)]"
        onMouseMove={tiltCard}
        onMouseLeave={resetCard}
      >
        <div className="relative h-60 shrink-0 overflow-hidden sm:h-64">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="proj-card-img object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <Eye size={28} className="text-white" />
            </div>
          </div>

          <div className="absolute left-4 top-4">
            <span
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm"
              style={{
                background: `${project.color}30`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold leading-tight text-white transition group-hover:text-indigo-300 md:text-2xl">
              {project.title}
            </h3>
            <span className="shrink-0 text-xs font-medium text-slate-500">{project.year}</span>
          </div>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400 md:text-[15px]">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

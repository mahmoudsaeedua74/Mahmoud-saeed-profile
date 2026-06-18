'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Plug, Rocket, Server, ShoppingBag, Smartphone, ExternalLink } from 'lucide-react';
import { Reveal } from '../anim';
import SectionTitle from '../SectionTitle';
import { STORES_SITE_URL } from '@/lib/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    icon: Smartphone,
    title: 'Frontend Development',
    desc: 'React, Next.js, TypeScript — fast, responsive, animated interfaces.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Node, Express, databases, auth, and integrations built to scale.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Products',
    desc: 'End-to-end delivery from meeting to launch with clear milestones.',
  },
  {
    icon: ShoppingBag,
    title: 'Zid & Salla Themes',
    desc: 'Custom storefronts, theme setup, CSS tweaks, and SDK work on Saudi platforms.',
  },
  {
    icon: Plug,
    title: 'Custom Integrations',
    desc: 'Payments, shipping, CRM, webhooks, and third-party tools connected to your product or store.',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    desc: 'Deployment, hosting, bug fixes, and post-launch updates so everything stays running.',
  },
];

function tiltCard(e: React.MouseEvent<HTMLElement>) {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(card, {
    rotateY: x * 14,
    rotateX: -y * 14,
    duration: 0.45,
    ease: 'power2.out',
    transformPerspective: 900,
  });
}

function resetCard(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: 'power3.out',
  });
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.service-card', {
          autoAlpha: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28"
      style={{ perspective: '1200px' }}
    >
      <div className="page-container">
        <div className="mb-14 text-center">
          <Reveal>
            <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[2px] text-indigo-400">
              What I Do
            </span>
          </Reveal>
          <SectionTitle
            text="SERVICES & SKILLS"
            mobileText="Services & Skills"
            containerRef={sectionRef}
          />
          <Reveal className="mx-auto mt-4 max-w-2xl text-slate-400" delay={0.15}>
            Full-stack, frontend-only, backend-only, or Zid &amp; Salla — hire me for the scope
            your project actually needs.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="service-card group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-indigo-500/30 hover:bg-white/[0.05]"
                onMouseMove={tiltCard}
                onMouseLeave={resetCard}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 transition group-hover:bg-indigo-600/30">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.desc}</p>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center" delay={0.2}>
          <a
            href={STORES_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-6 py-4 transition hover:border-indigo-500/50 hover:bg-indigo-500/15"
          >
            <ShoppingBag className="text-indigo-400" size={22} />
            <span className="text-sm font-semibold text-white md:text-base">
              Zid & Salla store themes — view dedicated showcase
            </span>
            <ExternalLink
              size={18}
              className="text-indigo-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

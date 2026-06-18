'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { timelineItems, type TimelineItem } from '@/app/data/timeline';
import { Reveal } from '../anim';
import SectionTitle from '../SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function TimelineCard({
  item,
  alignEnd,
}: {
  item: TimelineItem;
  alignEnd?: boolean;
}) {
  const Icon = item.icon;
  return (
    <div
      className={`tl-card rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm ${
        alignEnd ? 'md:ms-auto md:text-end' : ''
      } max-w-[400px]`}
    >
      <span
        className={`mb-3 inline-block rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300 ${
          alignEnd ? 'md:float-end md:ms-2' : ''
        }`}
      >
        {item.tag}
      </span>
      <h3
        className={`clear-both mb-2 text-[18px] font-bold text-white sm:text-[21px] ${
          alignEnd ? 'md:text-end' : ''
        }`}
      >
        {item.title}
      </h3>
      <p className="text-[14px] leading-[1.85] text-slate-400 sm:text-[15px]">{item.desc}</p>
    </div>
  );
}

export default function StoryTimeline() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineFill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (lineFill.current && trackRef.current) {
          gsap.fromTo(
            lineFill.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: trackRef.current,
                start: 'top 55%',
                end: 'bottom 35%',
                scrub: 0.3,
              },
            }
          );
        }

        gsap.utils.toArray<HTMLElement>('.tl-milestone').forEach((el, i) => {
          const card = el.querySelector('.tl-card');
          const axis = el.querySelector('.tl-axis');
          const fromX = i % 2 === 0 ? -72 : 72;

          if (card) {
            gsap.fromTo(
              card,
              { autoAlpha: 0, x: fromX, scale: 0.88 },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 78%', once: true },
              }
            );
          }

          if (axis) {
            ScrollTrigger.create({
              trigger: el,
              start: 'top 55%',
              end: 'bottom 45%',
              onEnter: () =>
                gsap.to(axis, { scale: 1.12, duration: 0.35, ease: 'back.out(2)' }),
              onLeave: () => gsap.to(axis, { scale: 1, duration: 0.25 }),
              onEnterBack: () =>
                gsap.to(axis, { scale: 1.12, duration: 0.35, ease: 'back.out(2)' }),
              onLeaveBack: () => gsap.to(axis, { scale: 1, duration: 0.25 }),
            });
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="story" ref={root} className="relative z-10 scroll-mt-24 bg-[#0a0f1a] py-20 sm:py-28">
      <div className="page-container">
        <div className="mx-auto mb-16 max-w-[620px] text-center">
          <Reveal>
            <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[2px] text-indigo-400">
              My Journey
            </span>
          </Reveal>
          <SectionTitle
            text="HOW I GOT HERE"
            mobileText="How I Got Here"
            containerRef={root}
          />
          <Reveal className="mt-3.5 text-[16px] text-slate-400 sm:text-[17px]" delay={0.12}>
            From self-taught foundations to full-stack delivery for startups, agencies, and
            e-commerce brands.
          </Reveal>
        </div>

        <div ref={trackRef} className="relative mx-auto max-w-[920px]">
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-white/10 md:block"
            aria-hidden
          />
          <div
            ref={lineFill}
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-0.5 origin-top -translate-x-1/2 bg-indigo-500 md:block"
            aria-hidden
          />

          <div className="flex flex-col gap-10 md:gap-0">
            {timelineItems.map((item, i) => {
              const even = i % 2 === 0;
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="tl-milestone grid items-center md:grid-cols-[1fr_3.5rem_1fr] md:py-9"
                >
                  <div className="hidden md:block">
                    {even ? <TimelineCard item={item} alignEnd /> : null}
                  </div>

                  <div className="relative z-10 flex justify-center">
                    <div className="tl-axis flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-[#0a0f1a] bg-slate-900 text-indigo-400 shadow-[0_0_0_4px_rgba(79,70,229,0.25)]">
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="hidden md:block">
                    {!even ? <TimelineCard item={item} /> : null}
                  </div>

                  <div className="mt-4 md:hidden">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
                        {item.tag}
                      </span>
                    </div>
                    <TimelineCard item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

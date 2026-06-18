'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { processSteps } from '@/app/data/process';
import Magnetic from '../Magnetic';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADER_OFFSET = 80;
const INTRO_UNITS = 1.6;
const CARD_UNIT = 1;
const TL_DURATION = (n: number) => INTRO_UNITS + n * CARD_UNIT;
const pinScrollPx = (n: number) =>
  Math.round(window.innerHeight * (INTRO_UNITS + n * CARD_UNIT - 0.2));

function setActiveDot(dots: HTMLElement[], active: number) {
  dots.forEach((dot, i) => {
    const on = i === active;
    dot.style.opacity = on ? '1' : '0.45';
    dot.classList.toggle('!w-10', on);
    dot.classList.toggle('sm:!w-12', on);
    dot.classList.toggle('bg-indigo-400', on);
    dot.classList.toggle('bg-white/15', !on);
  });
}

export default function ProcessPanels() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const total = processSteps.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const pin = pinRef.current;
        const intro = introRef.current;
        const introContent = introContentRef.current;
        const stage = stageRef.current;
        const chrome = chromeRef.current;
        const progress = progressRef.current;
        const bar = barRef.current;
        const counter = counterRef.current;
        if (!pin || !intro || !introContent || !stage) return;

        const panels = gsap.utils.toArray<HTMLElement>('.sp-panel', stage);
        const dots = progress ? gsap.utils.toArray<HTMLElement>('.sp-dot', progress) : [];
        const n = panels.length;
        const tlDuration = TL_DURATION(n);
        const introEndProgress = INTRO_UNITS / tlDuration;
        const cardsEndProgress = 1;

        const updateBar = (scrollProgress: number) => {
          if (!bar) return;
          if (scrollProgress < introEndProgress) {
            bar.style.width = '0%';
            return;
          }
          if (scrollProgress >= cardsEndProgress) {
            bar.style.width = '100%';
            return;
          }
          const cardsSpan = cardsEndProgress - introEndProgress;
          const cardOnly = (scrollProgress - introEndProgress) / cardsSpan;
          bar.style.width = `${Math.min(1, Math.max(0, cardOnly)) * 100}%`;
        };

        const hidePanel = (panel: HTMLElement) => {
          gsap.set(panel, {
            autoAlpha: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
          });
        };

        gsap.set(stage, { autoAlpha: 0 });
        gsap.set(chrome, { autoAlpha: 0 });
        gsap.set(intro, { autoAlpha: 1, visibility: 'visible' });
        gsap.set(introContent, {
          scale: 1,
          z: 0,
          autoAlpha: 1,
          force3D: true,
          transformOrigin: '50% 50%',
        });
        gsap.set(pin, { autoAlpha: 1 });
        panels.forEach(hidePanel);
        gsap.set(panels, { z: -520, scale: 0.78, rotateX: 14, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: `top ${HEADER_OFFSET}px`,
            end: () => `+=${pinScrollPx(n)}`,
            pin: pin,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress) => {
                const points: number[] = [0];
                for (let i = 0; i < n; i++) {
                  points.push((INTRO_UNITS + i + 0.55) / tlDuration);
                }
                points.push(1);
                let closest = points[0];
                let diff = Math.abs(progress - closest);
                for (const pt of points) {
                  const d = Math.abs(progress - pt);
                  if (d < diff) {
                    diff = d;
                    closest = pt;
                  }
                }
                return closest;
              },
              duration: { min: 0.28, max: 0.55 },
              delay: 0.02,
              ease: 'power2.inOut',
            },
            onUpdate(self) {
              updateBar(self.progress);
              if (self.progress < introEndProgress * 0.92) {
                if (chrome) gsap.set(chrome, { autoAlpha: 0 });
                return;
              }
              if (self.progress >= cardsEndProgress) {
                if (chrome) gsap.set(chrome, { autoAlpha: 0 });
                return;
              }
              if (chrome) gsap.set(chrome, { autoAlpha: 1 });
              const cardProgress =
                (self.progress - introEndProgress) / (n / tlDuration);
              const idx = Math.min(n - 1, Math.max(0, Math.floor(cardProgress * n)));
              setActiveDot(dots, idx);
              if (counter) {
                counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
              }
            },
          },
        });

        tl.fromTo(
          introContent,
          { scale: 1, z: 0, autoAlpha: 1, filter: 'blur(0px)' },
          {
            scale: 7,
            z: 720,
            autoAlpha: 0,
            filter: 'blur(6px)',
            duration: INTRO_UNITS * 0.82,
            ease: 'power3.in',
            force3D: true,
          },
          0.08
        );

        tl.to(intro, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, INTRO_UNITS - 0.22);
        tl.set(intro, { visibility: 'hidden' }, INTRO_UNITS);
        tl.to(stage, { autoAlpha: 1, duration: 0.15 }, INTRO_UNITS - 0.1);

        tl.set(panels[0], { visibility: 'visible', zIndex: 2 }, INTRO_UNITS)
          .fromTo(
            panels[0],
            {
              autoAlpha: 0,
              z: -520,
              scale: 0.72,
              rotateX: 16,
              pointerEvents: 'none',
            },
            {
              autoAlpha: 1,
              z: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.35,
              ease: 'power3.out',
              pointerEvents: 'auto',
              force3D: true,
            },
            INTRO_UNITS
          )
          .to({}, { duration: CARD_UNIT - 0.35 }, INTRO_UNITS + 0.35);

        for (let i = 1; i < n; i++) {
          const prev = panels[i - 1];
          const curr = panels[i];
          const t = INTRO_UNITS + i;

          tl.to(
            prev,
            {
              autoAlpha: 0,
              z: 380,
              scale: 1.08,
              rotateX: -8,
              duration: 0.28,
              ease: 'power2.in',
              force3D: true,
            },
            t
          )
            .set(prev, { visibility: 'hidden', pointerEvents: 'none', zIndex: 0 }, t + 0.28)
            .set(curr, { visibility: 'visible', zIndex: 2 }, t + 0.28)
            .fromTo(
              curr,
              {
                autoAlpha: 0,
                z: -560,
                scale: 0.76,
                rotateX: 12,
                pointerEvents: 'none',
              },
              {
                autoAlpha: 1,
                z: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.32,
                ease: 'power3.out',
                pointerEvents: 'auto',
                force3D: true,
              },
              t + 0.28
            )
            .to({}, { duration: CARD_UNIT - 0.6 }, t + 0.6);
        }

        tl.to(chrome, { autoAlpha: 1, duration: 0.2 }, INTRO_UNITS);
        setActiveDot(dots, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.sp-intro', '.sp-stage-3d'], { clearProps: 'all', autoAlpha: 1 });
        gsap.set('.sp-panel', { clearProps: 'all', autoAlpha: 1, position: 'relative' });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="relative z-10" aria-label="How I work">
      <div
        ref={pinRef}
        className="sp-scene relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_50%,#1e1b4b_0%,#05070A_50%,#0a0f1a_100%)]"
        style={{ height: 'calc(100dvh - 80px)' }}
      >
        <div
          ref={introRef}
          className="sp-intro absolute inset-0 z-20 flex items-center justify-center px-5"
        >
          <div ref={introContentRef} className="sp-intro-content px-5 text-center">
            <span className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[3px] text-indigo-400 sm:mb-5 sm:text-[13px]">
              How I Work
            </span>
            <h2 className="sp-hero-title mx-auto max-w-[900px] text-[28px] font-black leading-[1.15] text-white sm:text-[44px] lg:text-[56px]">
              My Full-Stack Process
            </h2>
          </div>
        </div>

        <div ref={chromeRef} className="pointer-events-none absolute inset-0 z-30 opacity-0">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-white/8">
            <div ref={barRef} className="h-full bg-indigo-400" style={{ width: '0%' }} />
          </div>
          <span
            ref={counterRef}
            className="absolute end-5 top-5 text-[12px] font-semibold tracking-wider text-white/35 sm:end-8 sm:top-6"
          >
            01 / {String(total).padStart(2, '0')}
          </span>
          <div
            ref={progressRef}
            className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5 px-5 sm:bottom-6"
            aria-hidden
          >
            {processSteps.map((item) => (
              <span key={item.title} className="sp-dot h-1 w-7 rounded-full bg-white/15 sm:w-9" />
            ))}
          </div>
        </div>

        <div ref={stageRef} className="sp-stage-3d absolute inset-0 z-10 overflow-hidden">
          {processSteps.map((item, i) => (
            <article
              key={item.title}
              className="sp-panel absolute inset-0 flex items-center px-5 py-8 sm:py-6"
              aria-hidden={i !== 0}
            >
              <div className="page-container grid w-full items-center gap-7 md:grid-cols-2 md:gap-10 lg:gap-14">
                <div className="order-2 md:order-1">
                  <div className="mb-2.5 flex flex-wrap items-center gap-2 sm:mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[2px] text-indigo-400 sm:text-[12px]">
                      {String(i + 1).padStart(2, '0')} — {item.tag}
                    </span>
                  </div>
                  <h3 className="text-[24px] font-black leading-[1.12] text-white sm:text-[34px] lg:text-[38px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[480px] text-[14px] leading-[1.85] text-white/72 sm:mt-4 sm:text-[15px]">
                    {item.desc}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm sm:text-[12px]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  {i === total - 1 && (
                    <Magnetic strength={0.3}>
                      <Link
                        href="#contact"
                        className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_22px_rgba(79,70,229,0.35)] sm:mt-7 sm:px-7 sm:py-3.5 sm:text-[15px]"
                      >
                        Start a Project
                      </Link>
                    </Magnetic>
                  )}
                </div>

                <div className="order-1 md:order-2">
                  <div className="relative mx-auto w-full max-w-[520px]">
                    <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0a0f1a] shadow-[0_40px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                      <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#0c1528] px-3.5 py-2.5 sm:px-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <span className="ms-2 truncate text-[10px] text-white/35 sm:text-[11px]">
                          mahmoud.dev — {item.tag}
                        </span>
                      </div>
                      <div
                        className="flex aspect-video w-full flex-col justify-end p-6 sm:aspect-[4/3]"
                        style={{ background: item.gradient }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                          Step {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 text-lg font-bold text-white sm:text-xl">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div
                      className="pointer-events-none absolute -inset-5 -z-10 rounded-[28px] opacity-75 blur-3xl"
                      style={{
                        background:
                          i % 2 === 0
                            ? 'radial-gradient(circle, rgba(79,70,229,0.28), transparent 70%)'
                            : 'radial-gradient(circle, rgba(30,27,75,0.5), transparent 70%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

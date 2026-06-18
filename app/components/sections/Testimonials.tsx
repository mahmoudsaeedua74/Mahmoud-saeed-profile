'use client';

import { Star, Quote } from 'lucide-react';
import InfiniteMarquee from '../InfiniteMarquee';
import { Reveal, RevealText } from '../anim';
import {
  testimonialRowA,
  testimonialRowB,
  type Testimonial,
} from '@/app/data/testimonials';

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="testimonial-card flex w-[320px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:w-[380px] sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Quote size={24} className="text-indigo-500/60" />
        <div className="flex gap-0.5">
          {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="flex-1 text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="font-semibold text-white">{item.name}</div>
        <div className="text-sm text-slate-500">{item.role}</div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden bg-[#0a0f1a] py-20 md:py-28"
    >
      <div className="page-container mb-12 md:mb-16">
        <div className="text-center">
          <Reveal>
            <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[2px] text-indigo-400">
              Testimonials
            </span>
          </Reveal>
          <RevealText
            text="What Clients Say"
            as="h2"
            className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl"
          />
        </div>
      </div>

      <div className="relative space-y-6 md:space-y-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f1a] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f1a] to-transparent sm:w-32" />

        <InfiniteMarquee direction="left" duration={60} gapClassName="gap-6 md:gap-8">
          {testimonialRowA.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </InfiniteMarquee>

        <InfiniteMarquee direction="right" duration={65} gapClassName="gap-6 md:gap-8">
          {testimonialRowB.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}

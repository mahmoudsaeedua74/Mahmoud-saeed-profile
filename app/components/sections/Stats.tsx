'use client';

import Counter from '../Counter';
import { Reveal } from '../anim';

const stats = [
  { value: '30+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Technologies' },
  { value: '100%', label: 'Client Focus' },
];

export default function Stats() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,#1e1b4b_0%,#05070A_70%)] py-16 sm:py-20">
      <div className="page-container">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <Counter
                value={stat.value}
                className="text-[36px] font-bold text-indigo-400 sm:text-[48px]"
              />
              <span className="mt-2 block text-sm text-slate-400 sm:text-[15px]">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

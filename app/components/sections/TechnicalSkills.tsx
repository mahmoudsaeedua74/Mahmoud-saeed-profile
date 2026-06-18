'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FaCss3Alt,
  FaGithub,
  FaGitSquare,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaSass,
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import {
  SiApollographql,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import InfiniteMarquee from '../InfiniteMarquee';
import { Reveal, RevealText } from '../anim';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Skill = {
  name: string;
  icon: React.ReactNode;
};

const topRowSkills: Skill[] = [
  { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'Next.js', icon: <RiNextjsFill className="text-white" /> },
  { name: 'Tailwind CSS', icon: <RiTailwindCssFill className="text-[#38BDF8]" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
  { name: 'Express', icon: <SiExpress className="text-white" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
];

const bottomRowSkills: Skill[] = [
  { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" /> },
  { name: 'HTML5', icon: <FaHtml5 className="text-[#E44D26]" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-[#264DE4]" /> },
  { name: 'Sass', icon: <FaSass className="text-[#CC6699]" /> },
  { name: 'Redux', icon: <SiRedux className="text-[#764ABC]" /> },
  { name: 'GraphQL', icon: <SiApollographql className="text-[#E535AB]" /> },
  { name: 'Git', icon: <FaGitSquare className="text-[#F05032]" /> },
  { name: 'GitHub', icon: <FaGithub className="text-white" /> },
  { name: 'NPM', icon: <FaNpm className="text-[#CB3837]" /> },
  { name: 'Framer Motion', icon: <TbBrandFramerMotion className="text-[#FF0055]" /> },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card group flex w-[120px] shrink-0 flex-col items-center gap-3 sm:w-[130px]">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-4xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.2)]">
        {skill.icon}
      </div>
      <span className="text-center text-xs font-semibold text-slate-400 transition-colors group-hover:text-indigo-300 sm:text-sm">
        {skill.name}
      </span>
    </div>
  );
}

export default function TechnicalSkills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.skill-card', {
          autoAlpha: 0,
          scale: 0.85,
          y: 24,
          duration: 0.55,
          stagger: 0.04,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="relative z-10 overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.06)_0%,transparent_65%)]" />

      <div className="page-container relative mb-12 md:mb-16">
        <div className="text-center">
          <Reveal>
            <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[2px] text-indigo-400">
              Tech Stack
            </span>
          </Reveal>
          <RevealText
            text="Technical Skills"
            as="h2"
            className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl"
          />
          <Reveal className="mx-auto mt-4 max-w-xl text-slate-400" delay={0.12}>
            Tools and technologies I use to ship fast, scalable, and polished products.
          </Reveal>
        </div>
      </div>

      <div className="relative space-y-10 md:space-y-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05070A] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05070A] to-transparent sm:w-28" />

        <InfiniteMarquee direction="left" duration={50} gapClassName="gap-8 md:gap-12">
          {topRowSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </InfiniteMarquee>

        <InfiniteMarquee direction="right" duration={55} gapClassName="gap-8 md:gap-12">
          {bottomRowSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}

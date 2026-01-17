'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from 'lucide-react';

const roles = [
  { text: 'FRONTEND DEVELOPER', color: '#6366f1' },
  { text: 'BACKEND ARCHITECT', color: '#10b981' },
  { text: 'CUSTOM THEME (ZID)', color: '#8b5cf6' },
  { text: 'CUSTOM THEME (SALLA)', color: '#14b8a6' },
];

const socials = [
  { icon: Github, href: 'https://github.com/mahmoudsaeedua74', color: '#fff' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mahmoud-saeed-8890092b5/', color: '#0A66C2' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100005360088833', color: '#1877F2' },
  { icon: Mail, href: 'mailto:mahmoudsaeed0112074@gmail.com', color: '#EA4335' },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // 1. One-time entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 5.5 });

    tl.from('.hero-greeting span', {
      y: 60,
      opacity: 0,
      rotateX: -90,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
    })
      .from('.hero-sub-text', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-role-section', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-social-item', {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(2)',
      }, '-=0.2')
      .from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');
  }, { scope: container });

  // 2. Role rotation
  useGSAP(() => {
    const rotateRole = () => {
      const nextIndex = (roleIndex + 1) % roles.length;

      gsap.to(roleRef.current, {
        y: -10,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex(nextIndex);
          gsap.fromTo(roleRef.current,
            { y: 10, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    };

    const timer = setTimeout(rotateRole, 3000);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  return (
    <section
      ref={container}
      id="hero"
      className="min-h-[100dvh] flex items-center justify-center px-4 md:px-12 lg:px-24 pt-24 pb-12 relative z-10 w-full"
    >
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-0">

        {/* Left Side: Greeting & Intro */}
        <div className="relative z-10 w-full md:w-[45%] space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

          <div className="hero-greeting head-1 uppercase font-black text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start">
            {"Hi, My Name Is".split(" ").map((word, idx) => (
              <span key={idx} className="inline-block whitespace-nowrap">{word}</span>
            ))}
            <span className="text-indigo-500 block w-full mt-2 font-['Belgrano']">Mahmoud</span>
          </div>

          <div className="hero-sub-text space-y-8 flex flex-col items-center md:items-start font-['Inter']">
            <div className="flex items-center gap-5 group">
              <div className="hidden md:block w-10 h-[3px] bg-indigo-500 group-hover:w-16 transition-all duration-500 rounded-full" />
              <span className="text-white text-lg sm:text-xl lg:text-3xl font-extrabold uppercase tracking-tighter leading-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent italic">
                Develop Your Dream App Now
              </span>
            </div>

            <div className="cursor-target flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-5 py-2.5 rounded-full transition-colors hover:bg-slate-900/80">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite] shadow-[0_0_10px_#10b981]" />
              <span className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">Available For Projects</span>
            </div>
          </div>
        </div>

        {/* Right Side: Role & Socials */}
        <div className="w-full md:w-[55%] flex flex-col items-center md:items-end justify-start gap-12 md:gap-16">

          <div className="hero-role-section flex flex-col items-center md:items-end space-y-4 w-full">
            <h2 className="text-white font-bold uppercase tracking-[0.4rem] sm:tracking-[0.6rem] md:tracking-[0.8rem] lg:tracking-[1rem] text-xl sm:text-3xl md:text-4xl lg:text-5xl select-none font-['Belgrano'] text-center md:text-right">
              Working As
            </h2>
            <div className="relative w-full flex items-center justify-center md:justify-end h-16 sm:h-20 lg:h-24 overflow-hidden">
              <div
                ref={roleRef}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black whitespace-nowrap leading-none transition-colors duration-500 text-center md:text-right font-['Inter']"
                style={{ color: roles[roleIndex].color }}
              >
                {roles[roleIndex].text}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-10 w-full">
            {/* Social Grid - Fixed z-index and reduced padding to ensure visibility */}
            <div className="relative z-20 flex flex-wrap justify-center md:justify-end gap-4 p-4 sm:p-5 rounded-[2rem] bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-item cursor-target w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-[1rem] bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/10 hover:border-indigo-500/50 hover:-translate-y-1 active:scale-95 group"
                  style={{ color: social.color }}
                  aria-label={social.href}
                >
                  <social.icon className="w-6 h-6 sm:w-7 sm:h-7 transition-colors group-hover:text-white" />
                </a>
              ))}
            </div>

            <a
              href="mailto:mahmoudsaeed0112074@gmail.com"
              className="hero-btn cursor-target relative group px-10 py-5 sm:px-12 sm:py-6 rounded-2xl bg-indigo-600 overflow-hidden shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-indigo-400/20"
            >
              <div className="relative z-10 text-white font-black text-xl sm:text-2xl uppercase tracking-tighter flex items-center gap-4 font-['Inter']">
                Say Hi !
                <ArrowUpRight size={26} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

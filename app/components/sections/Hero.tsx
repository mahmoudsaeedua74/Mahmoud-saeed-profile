'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from 'lucide-react';

const roles = [
  { text: 'FRONTEND DEVELOPER', color: '#6366f1' },
  { text: 'BACKEND ARCHITECT', color: '#10b981' },
  { text: 'CUSTOM THEME (ZID)', color: '#8b5cf6' },
  { text: 'CUSTOM THEME (SALLA)', color: '#12b8a6' },
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

  // 1. SIMPLIFIED Entrance Animation
  useGSAP(() => {
    // Only animate the text elements that were working fine
    // We removed the 'from' animation for socials/btn to force them to be visible by default
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
      }, '-=0.4');

    // Explicitly set opacity to 1 for safety, although they are visible by default now
    gsap.set('.hero-social-item, .hero-btn', { opacity: 1, scale: 1, y: 0 });

  }, { scope: container });

  // 2. Role rotation
  useGSAP(() => {
    const rotateRole = () => {
      const nextIndex = (roleIndex + 1) % roles.length;

      gsap.to(roleRef.current, {
        y: -15,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex(nextIndex);
          gsap.fromTo(roleRef.current,
            { y: 15, opacity: 0, filter: 'blur(10px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
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
      // REMOVED 'overflow-hidden' and added 'min-h-[100vh]' to allow scrolling if needed
      // Added 'flex-col' by default for mobile sanity
      className="min-h-screen w-full flex items-center justify-center px-4 md:px-12 lg:px-24 pt-32 pb-24 relative z-10"
    >
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-0">

        {/* Left Content Column */}
        <div className="relative z-10 w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left space-y-12">
          {/* Decorative Background */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

          <div className="hero-greeting head-1 uppercase font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start">
            {"Hi, My Name Is".split(" ").map((word, idx) => (
              <span key={idx} className="inline-block whitespace-nowrap">{word}</span>
            ))}
            <span className="text-indigo-500 block w-full mt-4 ">Mahmoud</span>
          </div>

          <div className="hero-sub-text flex flex-col items-center md:items-start space-y-8 ">
            <div className="flex items-center gap-5 group">
              <div className="hidden md:block w-12 h-[3px] bg-indigo-500 group-hover:w-20 transition-all duration-500 rounded-full" />
              <span className="text-white text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tighter leading-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent italic">
                Develop Your Dream App Now
              </span>
            </div>

            <div className="cursor-target flex items-center gap-3 bg-slate-900/40 border border-slate-800/60 px-6 py-3 rounded-full transition-all hover:bg-slate-900/80 hover:border-indigo-500/30">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite] shadow-[0_0_15px_#10b981]" />
              <span className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-[0.2em]">Available For Projects</span>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="w-full md:w-[50%] flex flex-col items-center md:items-end justify-start gap-12 md:gap-20">

          {/* Role Section */}
          <div className="hero-role-section flex flex-col items-center md:items-end space-y-">
            <h2 className="text-white font-bold uppercase tracking-[0.4rem]   text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none  leading-none text-center md:text-right">
              Working As
            </h2>
            {/* Added styling to prevent overflow hiding issues here too if necessary, but kept hidden for role rotation */}
            <div className="relative w-full flex items-center justify-center md:justify-end  overflow-hidden bg-white/5 md:bg-transparent rounded-2xl md:rounded-none px-4 md:px-0">
              <div
                ref={roleRef}
                className="text-3xl sm:text-4xl md:text-5xl  font-black whitespace-nowrap leading-none transition-colors duration-700 text-center md:text-right "
                style={{ color: roles[roleIndex].color }}
              >
                {roles[roleIndex].text}
              </div>
            </div>
          </div>

          {/* Socials & CTA Area - NO ANIMATION HIDING */}
          <div className="relative z-30 flex flex-col items-center md:items-end gap-6 w-full">
            {/* Social Grid */}
            <div className="flex flex-wrap justify-center md:justify-end gap-5 p-6 rounded-[2.5rem] bg-slate-900/90 border border-white/10 backdrop-blur-2xl shadow-[0_25px_75px_rgba(0,0,0,0.6)] border-indigo-500/20">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-item cursor-target w-12 h-12 sm:w-14 sm:h-12 flex items-center justify-center rounded-2xl bg-white/[0.1] hover:bg-indigo-600 transition-all border border-white/10 hover:border-indigo-400/50 hover:-translate-y-2 lg:hover:scale-110 active:scale-90 group"
                  aria-label={social.href}
                >
                  <social.icon
                    size={32}
                    color={social.color}
                    className="sm:w-6 sm:h-6 transition-all group-hover:scale-110 group-hover:text-white"
                  />
                </a>
              ))}
            </div>

            {/* Principal CTA */}
            <a
              href="mailto:mahmoudsaeed0112074@gmail.com"
              className="hero-btn cursor-target relative group px-12 py-6 sm:px-16 sm:py-8 rounded-2xl bg-indigo-600 overflow-hidden shadow-[0_25px_50px_rgba(79,70,229,0.4)] hover:shadow-[0_35px_70px_rgba(79,70,229,0.6)] transition-all hover:scale-[1.05] active:scale-[0.98] border border-indigo-400/20"
            >
              <div className="relative z-10 text-white font-black text-lg sm:text-2xl  uppercase tracking-tighter flex items-center gap-5 ">
                Say Hi !
                <ArrowUpRight size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

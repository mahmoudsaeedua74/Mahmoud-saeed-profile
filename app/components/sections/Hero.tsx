'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from 'lucide-react';

const roles = [
  { text: 'FRONTEND DEVELOPER', color: '#6366f1' },
  { text: 'BACKEND ARCHITECT', color: '#10b981' },
  { text: 'ZID THEME SPECIALIST', color: '#8b5cf6' },
  { text: 'SALLA THEME EXPERT', color: '#12b8a6' },
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

  // 1. Entrance Animation - Triggered after loading screen
  useGSAP(() => {
    // Hide elements IMMEDIATELY on mount (including hero-name now!)
    gsap.set('.hero-greeting-word, .hero-name, .hero-sub-text, .hero-role-title, .hero-role-text, .hero-social-container, .hero-btn', {
      opacity: 0
    });

    const startAnimation = () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Smooth slide from LEFT for greeting words only (not the name)
      tl.fromTo('.hero-greeting-word', 
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
        // Name animates separately with same style
        .fromTo('.hero-name',
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.4'
        )
        // Subtitle slides from left
        .fromTo('.hero-sub-text',
          {
            x: -80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.5'
        )
        // Role TITLE slides from RIGHT
        .fromTo('.hero-role-title',
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
          }, '-=0.6'
        )
        // Role TEXT appears smoothly
        .fromTo('.hero-role-text',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out'
          }, '-=0.4'
        )
        // Social container (background + icons together) from right
        .fromTo('.hero-social-container',
          {
            x: 80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.5'
        )
        // CTA button slides from right
        .fromTo('.hero-btn',
          {
            x: 60,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.5'
        );
    };

    // Start animation after loading (5s) + overlap (0.8s)
    const timer = setTimeout(() => {
      startAnimation();
    }, 5800);

    // Add floating animation to decorative background
    gsap.to('.hero-decorative-bg', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => clearTimeout(timer);
  }, { scope: container });

  // 2. Role rotation with smooth animation
  useGSAP(() => {
    const rotateRole = () => {
      const nextIndex = (roleIndex + 1) % roles.length;

      // Smooth slide up and fade out
      gsap.to(roleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => {
          setRoleIndex(nextIndex);
          // Smooth slide down and fade in
          gsap.fromTo(roleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
          );
        }
      });
    };

    const timer = setTimeout(rotateRole, 2000); // Change every 2 seconds
    return () => clearTimeout(timer);
  }, [roleIndex]);

  return (
    <section
      ref={container}
      id="hero"
      className="min-h-screen w-full flex items-center justify-center px-4 md:px-12 lg:px-24 pt-32 pb-24 relative z-10"
    >
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-0">

        {/* Left Content Column */}
        <div className="hero-section relative z-10 w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left space-y-12">
          {/* Decorative Background */}
          <div className="hero-decorative-bg absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

          <div className="hero-greeting head-1 uppercase font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start">
            {"Hi, My Name Is".split(" ").map((word, idx) => (
              <span key={idx} className="hero-greeting-word inline-block whitespace-nowrap">{word}</span>
            ))}
            <span className="hero-name text-indigo-500 block w-full mt-4">Mahmoud</span>
          </div>

          <div className="hero-sub-text flex flex-col items-center md:items-start space-y-8 ">
            <div className="flex items-center gap-5 group">
              <div className="hidden md:block w-12 h-[3px] bg-indigo-500 group-hover:w-20 transition-all duration-500 rounded-full" />
              <span className="text-white text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tighter leading-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent italic">
                Develop Your Dream App Now
              </span>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/60 px-6 py-3 rounded-full hover:bg-slate-900/80 hover:border-indigo-500/30">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite] shadow-[0_0_15px_#10b981]" />
              <span className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-[0.2em]">Available For Projects</span>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="w-full md:w-[50%] flex flex-col items-center md:items-end justify-start gap-12 md:gap-20">

          {/* Role Section */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h2 className="hero-role-title text-white font-bold uppercase tracking-[0.4rem] text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none leading-none text-center md:text-right">
              Working As
            </h2>
            <div className="relative w-full flex items-center justify-center md:justify-end overflow-hidden bg-white/5 md:bg-transparent rounded-2xl md:rounded-none px-4 md:px-0 min-h-[60px]">
              <div
                ref={roleRef}
                className="hero-role-text text-3xl sm:text-4xl md:text-5xl font-black whitespace-nowrap leading-none transition-colors duration-700 text-center md:text-right"
                style={{ color: roles[roleIndex].color }}
              >
                {roles[roleIndex].text}
              </div>
            </div>
          </div>

          <div className="relative z-30 flex flex-col items-center md:items-end gap-6 w-full">

            {/* SOCIAL ICONS - Background and icons animate together */}
            <div className="hero-social-container flex flex-wrap justify-center md:justify-end gap-4 p-5 rounded-[2.5rem] bg-slate-900/90 border border-white/10 backdrop-blur-2xl shadow-[0_25px_75px_rgba(0,0,0,0.6)] border-indigo-500/20">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:scale-125 group bg-white/[0.03]"
                  style={{ '--hover-color': social.color } as any}
                  aria-label={social.href}
                >
                  <social.icon
                    size={24}
                    className="relative z-10 group-hover:text-[var(--hover-color)] transition-colors duration-300"
                  />

                  <span
                    className="absolute inset-0 rounded-full border-2 border-indigo-500/0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-120 group-hover:border-[var(--hover-color)] transition-all duration-500"
                  />

                  <span
                    className="absolute inset-0 rounded-full bg-[var(--hover-color)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="mailto:mahmoudsaeed0112074@gmail.com"
              className="hero-btn cursor-target relative group px-12 py-6 sm:px-16 sm:py-8 rounded-2xl bg-indigo-600 overflow-hidden shadow-[0_25px_50px_rgba(79,70,229,0.4)] hover:shadow-[0_35px_70px_rgba(79,70,229,0.6)] transition-all hover:scale-[1.05] active:scale-[0.98] border border-indigo-400/20"
            >
              <div className="relative z-10 text-white font-black text-lg sm:text-2xl uppercase tracking-tighter flex items-center gap-5">
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
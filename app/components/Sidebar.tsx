'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/mahmoudsaeedua74',
    label: 'GitHub',
    color: '#F8FAFC',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/mahmoud-saeed-8890092b5/',
    label: 'LinkedIn',
    color: '#0A66C2',
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=100005360088833',
    label: 'Facebook',
    color: '#1877F2',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/mahmoud_sa3eed_/',
    label: 'Instagram',
    color: '#E4405F',
  },
  {
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mahmoudsaeed0112074@gmail.com',
    label: 'Email',
    color: '#EA4335',
  },
];

import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [activeTooltip, setActiveTooltip] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (!listRef.current) return;

    // Entrance animation delay
    const entranceDelay = pathname === '/' ? 5.5 : 0.5;
    const tl = gsap.timeline({ delay: entranceDelay });

    tl.fromTo(containerRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
      .from('.sidebar-icon-item', {
        scale: 0,
        rotate: -180,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.5');
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / 5;
    const y = (clientY - (top + height / 2)) / 5;

    gsap.to(containerRef.current, {
      x: x,
      y: y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setActiveTooltip('');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden sm:block fixed top-1/2 -translate-y-1/2 left-6 z-50"
    >
      <div
        ref={listRef}
        className="flex flex-col gap-y-5 p-4 rounded-full backdrop-blur-xl border border-indigo-500/20 bg-slate-900/40 shadow-2xl"
      >
        {socialLinks.map(({ icon: Icon, href, label, color }) => (
          <div
            key={href}
            className="sidebar-icon-item relative group"
            onMouseEnter={() => setActiveTooltip(href)}
            onMouseLeave={() => setActiveTooltip('')}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target relative w-12 h-12 flex items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:scale-125"
              style={{ '--hover-color': color } as any}
            >
              <Icon size={24} className="relative z-10 group-hover:text-[var(--hover-color)] transition-colors duration-300" />

              {/* Outer glow ring */}
              <span
                className="absolute inset-0 rounded-full border-2 border-indigo-500/0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-120 group-hover:border-[var(--hover-color)] transition-all duration-500"
              />

              {/* Inner glow pulse */}
              <span
                className="absolute inset-0 rounded-full bg-[var(--hover-color)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </a>

            {/* Tooltip */}
            <div
              className={`absolute left-full ml-5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold tracking-wide whitespace-nowrap pointer-events-none transition-all duration-300 bg-slate-900/90 backdrop-blur-sm border border-indigo-500/30 shadow-2xl ${activeTooltip === href ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
            >
              {label}
              <div
                className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-slate-900/90"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

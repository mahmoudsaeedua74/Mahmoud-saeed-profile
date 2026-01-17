'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

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

export default function Sidebar() {
  const [activeTooltip, setActiveTooltip] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (pathname === '/') {
      // Initial Hidden State
      gsap.set(containerRef.current, { x: -100, yPercent: -50, opacity: 0 });

      // Show sidebar when user scrolls down 100px
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const scrollY = self.scroll();
          if (scrollY > 200) {
            // Show sidebar
            gsap.to(containerRef.current, {
              x: 0,
              yPercent: -50,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
            });
          } else {
            // Hide sidebar
            gsap.to(containerRef.current, {
              x: -100,
              yPercent: -50,
              opacity: 0,
              duration: 0.5,
              ease: 'power3.in',
            });
          }
        }
      });
    } else {
      // On other pages, show immediately
      gsap.set(containerRef.current, { x: -100, yPercent: -50, opacity: 0 });
      gsap.to(containerRef.current, {
        x: 0,
        yPercent: -50,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    }
  }, { scope: containerRef, dependencies: [pathname] });


  return (
    <div
      ref={containerRef}

      className="hidden lg:block fixed top-1/2 left-6 z-50"
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
              className="cursor-target relative w-12 h-12 flex items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:scale-110"
              style={{ '--hover-color': color } as any}
            >
              <Icon size={24} className="relative z-10 group-hover:text-[var(--hover-color)] transition-colors duration-300" />

              {/* Outer glow ring */}
              <span
                className="absolute inset-0 rounded-full border-2 border-indigo-500/0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:border-[var(--hover-color)] transition-all duration-500"
              />

              {/* Inner glow pulse */}
              <span
                className="absolute inset-0 rounded-full bg-[var(--hover-color)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </a>

            {/* Tooltip */}
            <div
              className={`absolute start-[110%] bottom-0 ms-5 mb-2 px-3 py-1.5 rounded-lg text-white text-xs font-semibold tracking-wide whitespace-nowrap pointer-events-none transition-all duration-300 bg-slate-900/90 backdrop-blur-sm border border-indigo-500/30 shadow-2xl ${activeTooltip === href ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
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
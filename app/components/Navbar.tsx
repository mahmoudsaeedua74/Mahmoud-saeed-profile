'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Initial entrance - delay only on home page due to loading screen
    const entranceDelay = pathname === '/' ? 5.5 : 0.5;

    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: entranceDelay,
          ease: 'power3.out',
        }
      );
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: hidden ? -150 : 0,
        opacity: hidden ? 0 : 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [hidden]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/' + href);
    }
  };

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex fixed top-10 inset-x-0 mx-auto z-[5000] max-w-fit items-center justify-center space-x-4 px-10 py-5 rounded-xl border shadow-lg"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        borderColor: 'rgba(79, 70, 229, 0.2)',
      }}
    >
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="cursor-target relative text-neutral-200 hover:text-white flex items-center space-x-1 cursor-pointer transition-colors group"
        >
          <span className="text-sm font-medium">{item.name}</span>
          <span
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 transform-gpuOrigin-left"
            style={{ transformOrigin: 'left' }}
          />
        </a>
      ))}
    </nav>
  );
}

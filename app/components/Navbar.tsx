'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { STORES_SITE_URL } from '@/lib/site';

const navItems = [
  { name: 'Home', href: '/', type: 'page' as const },
  { name: 'Projects', href: '/projects', type: 'page' as const },
  { name: 'Stores', href: STORES_SITE_URL, type: 'external' as const },
  { name: 'Contact', href: '/#contact', type: 'page' as const },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hasLoadedBefore =
      typeof window !== 'undefined' ? sessionStorage.getItem('hasLoadedBefore') : null;

    const isFirstLoad = pathname === '/' && hasLoadedBefore !== 'true';
    const entranceDelay = isFirstLoad ? 5.5 : 0.3;

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number]
  ) => {
    if (item.type === 'external') return;

    if (item.href.startsWith('/#')) {
      e.preventDefault();
      const id = item.href.replace('/#', '');
      if (pathname === '/') {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push(item.href);
      }
      return;
    }

    if (item.href === '/' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-10 z-[5000] mx-auto hidden max-w-fit items-center justify-center space-x-4 rounded-xl border px-6 py-4 shadow-lg md:flex md:px-10 md:py-5"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        borderColor: 'rgba(79, 70, 229, 0.2)',
      }}
    >
      {navItems.map((item) =>
        item.type === 'external' ? (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex cursor-pointer items-center space-x-1 text-neutral-200 transition-colors hover:text-white"
          >
            <span className="text-xs font-medium md:text-sm">{item.name}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        ) : (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            className="group relative flex cursor-pointer items-center space-x-1 text-neutral-200 transition-colors hover:text-white"
          >
            <span className="text-xs font-medium md:text-sm">{item.name}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        )
      )}
    </nav>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll-to-section';

function scrollFromHash() {
  const id = window.location.hash.replace(/^#/, '');
  if (!id) return;

  const run = () => {
    if (!scrollToSection(id)) {
      window.setTimeout(() => scrollToSection(id), 120);
    }
  };

  requestAnimationFrame(() => requestAnimationFrame(run));
}

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    scrollFromHash();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.pathname !== '/') return;
      scrollFromHash();
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}

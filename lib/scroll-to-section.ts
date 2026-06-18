import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const HEADER_OFFSET = 96;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: y, behavior: 'auto' });
    return true;
  }

  gsap.to(window, {
    scrollTo: { y, autoKill: true },
    duration: 0.9,
    ease: 'power3.inOut',
  });

  return true;
}

/** On sub-pages, section hashes must point back to the home route. */
export function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith('#')) {
    return pathname === '/' ? href : `/${href}`;
  }
  return href;
}

export function isHomeSectionHref(href: string) {
  return href.startsWith('#');
}

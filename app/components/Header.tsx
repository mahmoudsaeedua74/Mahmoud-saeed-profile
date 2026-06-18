'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ExternalLink, FileDown, Menu, X } from 'lucide-react';
import { cvUrl, STORES_SITE_URL } from '@/lib/site';
import { INTRO_DONE_EVENT, isIntroDone, markIntroDone } from '@/lib/intro';
import { isHomeSectionHref, resolveNavHref, scrollToSection } from '@/lib/scroll-to-section';

const CV_LINK_PROPS = {
  href: cvUrl,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

function subscribeIntroDone(onStoreChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onStoreChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onStoreChange);
}

function MenuBarsIcon() {
  return (
    <svg viewBox="0 0 80 75" className="header-menu-btn__bars" aria-hidden>
      <rect width="80" height="12" fill="currentColor" rx="6" />
      <rect y="28" width="80" height="12" fill="currentColor" rx="6" />
      <rect y="56" width="80" height="12" fill="currentColor" rx="6" />
    </svg>
  );
}

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuTweenRef = useRef<gsap.core.Timeline | null>(null);
  const menuInitialized = useRef(false);
  const played = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const introDone = useSyncExternalStore(subscribeIntroDone, isIntroDone, () => false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const handleSectionNav = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname === '/' && isHomeSectionHref(href)) {
        event.preventDefault();
        const id = href.slice(1);
        if (scrollToSection(id)) {
          window.history.pushState(null, '', href);
        }
      }
      closeMenu();
    },
    [pathname, closeMenu]
  );

  useEffect(() => {
    if (pathname !== '/') {
      markIntroDone();
    }
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    if (!introDone) {
      gsap.set(el, { autoAlpha: 0 });
      return;
    }

    if (played.current) return;
    played.current = true;

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.08, clearProps: 'transform' }
    );
  }, [introDone]);

  useLayoutEffect(() => {
    const panel = menuPanelRef.current;
    if (!panel) return;
    gsap.set(panel, { x: '-100%', pointerEvents: 'none' });
  }, []);

  useEffect(() => {
    const panel = menuPanelRef.current;
    if (!panel) return;

    menuTweenRef.current?.kill();
    const linksEls = panel.querySelectorAll<HTMLElement>('[data-nav-link]');

    if (!menuOpen) {
      if (!menuInitialized.current) {
        gsap.set(panel, { x: '-100%', pointerEvents: 'none' });
        gsap.set(linksEls, { autoAlpha: 0 });
        return;
      }

      menuTweenRef.current = gsap
        .timeline({
          onComplete: () => {
            gsap.set(panel, { pointerEvents: 'none' });
            document.body.style.overflow = '';
          },
        })
        .to(linksEls, {
          autoAlpha: 0,
          x: -20,
          duration: 0.18,
          stagger: 0.03,
          ease: 'power2.in',
        })
        .to(panel, { x: '-100%', duration: 0.38, ease: 'power3.in' }, '-=0.05');
      return;
    }

    menuInitialized.current = true;
    document.body.style.overflow = 'hidden';
    gsap.set(panel, { pointerEvents: 'auto' });

    menuTweenRef.current = gsap
      .timeline()
      .fromTo(panel, { x: '-100%' }, { x: '0%', duration: 0.48, ease: 'power3.out' })
      .fromTo(
        linksEls,
        { autoAlpha: 0, x: -36 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.38,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '-=0.22'
      );

    return () => {
      menuTweenRef.current?.kill();
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  const cvClassName =
    'header-bar-btn gap-1.5 rounded-full border border-indigo-500/35 bg-indigo-500/8 px-3.5 text-[10px] font-black tracking-[0.12em] text-indigo-300 hover:border-indigo-400/55 hover:bg-indigo-500/14 md:gap-2 md:px-5 md:text-xs';

  const storesClassName =
    'header-bar-btn header-bar-btn--square rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-slate-200 backdrop-blur-md hover:border-indigo-400/45 hover:bg-indigo-500/10 hover:text-indigo-200 md:text-sm';

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[500] ${introDone ? '' : 'invisible pointer-events-none'}`}
    >
      <div
        className={`site-header-bar wrap flex items-center justify-between gap-2 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-opacity duration-200 md:gap-3 md:py-4 ${
          menuOpen ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            aria-label="Open menu"
            className="header-menu-btn hidden md:!flex"
          >
            <span className="header-menu-btn__icon">
              <MenuBarsIcon />
            </span>
            <span className="header-menu-btn__text">MENU</span>
          </button>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            aria-label="Open menu"
            className="header-bar-btn header-bar-btn--square max-md:!inline-flex md:!hidden rounded-full bg-indigo-600 text-white shadow-[0_0_22px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <a {...CV_LINK_PROPS} aria-label="Download CV" className={cvClassName}>
            <FileDown className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" aria-hidden />
            CV
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {pathname !== '/projects' && (
            <Link href="/projects" className="group">
              <span className="header-bar-btn gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-3 hover:border-indigo-400/55 hover:bg-indigo-500/10 md:gap-2 md:px-4">
                <span className="text-[9px] font-black tracking-[0.14em] text-indigo-400 uppercase transition-colors group-hover:text-indigo-300 md:text-[10px] md:tracking-[0.16em]">
                  Projects
                </span>
                <span
                  className="ms-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.9)] animate-pulse md:ms-2 md:h-2 md:w-2"
                  aria-hidden
                />
              </span>
            </Link>
          )}

          <a
            href={STORES_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zid & Salla stores showcase"
            className={storesClassName}
            title="Zid & Salla stores"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>

      <div
        id="site-nav-menu"
        ref={menuPanelRef}
        role="navigation"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[600] flex bg-[#05070A]"
      >
        <div className="site-header-bar wrap flex h-full w-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="mb-6 flex items-center md:mb-10">
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="header-bar-btn header-bar-btn--square rounded-full bg-indigo-600 text-white shadow-[0_0_22px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
            >
              <X className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" aria-hidden />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-5 sm:gap-7 md:gap-8">
            {links.map((link, index) => (
              <li
                key={link.label}
                data-nav-link
                className="opacity-0"
                style={{ marginInlineStart: `${index * 14}px` }}
              >
                <Link
                  href={resolveNavHref(link.href, pathname)}
                  onClick={(event) => handleSectionNav(event, link.href)}
                  className="block text-[clamp(2.25rem,11vw,3.75rem)] font-black leading-[0.95] text-white transition duration-200 hover:translate-x-1 hover:text-indigo-300 md:text-[clamp(2.75rem,6vw,4.5rem)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            {...CV_LINK_PROPS}
            onClick={closeMenu}
            className="header-bar-btn mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/35 bg-indigo-500/10 px-5 py-2.5 text-sm font-bold text-indigo-300 hover:border-indigo-400/55 md:px-6 md:py-3 md:text-base"
          >
            <FileDown className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}

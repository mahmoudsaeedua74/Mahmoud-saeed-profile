'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Github, Linkedin, Facebook, Instagram, Mail, Home, User, Briefcase, Award, MessageSquare, FolderOpen, Code2, ExternalLink } from 'lucide-react';
import { STORES_SITE_URL } from '@/lib/site';

const navItems = [
  { name: 'Home', href: '/', icon: Home, external: false },
  { name: 'Projects', href: '/projects', icon: FolderOpen, external: false },
  { name: 'Services', href: '#services', icon: Briefcase, external: false },
  { name: 'Skills', href: '#skills', icon: Code2, external: false },
  { name: 'Testimonials', href: '#testimonials', icon: Award, external: false },
  { name: 'Contact', href: '#contact', icon: MessageSquare, external: false },
  { name: 'Zid & Salla', href: STORES_SITE_URL, icon: ExternalLink, external: true },
];

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
    href: 'mailto:mahmoudsaeed0112074@gmail.com',
    label: 'Email',
    color: '#EA4335',
  },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check if loading (only on home page)
  useEffect(() => {
    if (pathname === '/') {
      // Home page has 5 second loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 6000); // Wait for loading to complete
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  // Animate button entrance
  useGSAP(() => {
    if (!buttonRef.current || isLoading) return;
    
    gsap.fromTo(buttonRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: -20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        delay: pathname === '/' ? 0.5 : 0,
        ease: 'back.out(1.4)',
      }
    );
  }, { scope: buttonRef, dependencies: [isLoading, pathname] });

  // Animate sidebar open/close
  useGSAP(() => {
    if (!sidebarRef.current || !menuRef.current) return;

    if (isOpen) {
      // Open sidebar
      const tl = gsap.timeline();
      
      // Show overlay if it exists
      if (overlayRef.current) {
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, 0);
      }
      
      // Slide in sidebar
      tl.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, 0.1);
      
      // Animate menu items
      const navItems = menuRef.current.querySelectorAll('.nav-item');
      if (navItems.length > 0) {
        tl.fromTo(navItems,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power3.out',
          },
          0.2
        );
      }
      
      // Animate social icons
      const socialItems = menuRef.current.querySelectorAll('.social-item');
      if (socialItems.length > 0) {
        tl.fromTo(socialItems,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.4)',
          },
          0.4
        );
      }
    } else {
      // Close sidebar
      const tl = gsap.timeline();
      
      // Hide menu items
      const allItems = menuRef.current.querySelectorAll('.nav-item, .social-item');
      if (allItems.length > 0) {
        tl.to(allItems, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        }, 0);
      }
      
      // Slide out sidebar
      tl.to(sidebarRef.current, {
        x: '-100%',
        duration: 0.4,
        ease: 'power3.in',
      }, 0.1);
      
      // Hide overlay if it exists
      if (overlayRef.current) {
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        }, 0.1);
      }
    }
  }, { scope: sidebarRef, dependencies: [isOpen] });

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClick = (href: string, external?: boolean) => {
    if (external || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
      return;
    }
    if (href.startsWith('#')) {
      // Scroll to section on same page
      if (pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setIsOpen(false);
        }
      } else {
        // Navigate to home page then scroll
        router.push(`/${href}`);
        setIsOpen(false);
      }
    } else {
      // Navigate to different page
      router.push(href);
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile, hidden during loading */}
      {!isLoading && (
        <button
          ref={buttonRef}
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-6 z-[6000] group"
          aria-label="Toggle menu"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-xl group-hover:bg-indigo-600/30 transition-colors" />
            
            {/* Button background */}
            <div className="relative w-full h-full rounded-full bg-black/40 backdrop-blur-xl border border-indigo-500/30 group-hover:border-indigo-500/50 transition-all group-hover:scale-110 flex items-center justify-center">
              <div className="relative w-6 h-5 flex flex-col justify-between">
                {isOpen ? (
                  <>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-white rotate-45 transition-transform" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-white -rotate-45 transition-transform" />
                  </>
                ) : (
                  <>
                    <span className="w-full h-0.5 bg-white rounded-full transition-all group-hover:bg-indigo-400" />
                    <span className="w-full h-0.5 bg-white rounded-full transition-all group-hover:bg-indigo-400" />
                    <span className="w-full h-0.5 bg-white rounded-full transition-all group-hover:bg-indigo-400" />
                  </>
                )}
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[5998] opacity-0"
          style={{ opacity: 0 }}
        />
      )}

      {/* Sidebar - Background matches main background */}
      <div
        ref={sidebarRef}
        className="lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[5999] bg-black/95 backdrop-blur-xl border-r border-indigo-500/20 shadow-2xl"
        style={{ transform: 'translateX(-100%)' }}
      >
        <div ref={menuRef} className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          {/* Logo/Brand */}
          <div className="mb-8 text-center pb-6 border-b border-white/10">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-1">
              Portfolio
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Mahmoud Saeed</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 mb-8">
            <ul className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (pathname === '/' && item.href.startsWith('#'));
                
                return (
                  <li key={item.name} className="nav-item">
                    <button
                      onClick={() => handleClick(item.href, item.external)}
                      className="w-full text-left cursor-pointer group/nav"
                    >
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'text-white bg-white/5'
                          : 'text-neutral-200 group-hover/nav:text-white group-hover/nav:bg-white/5'
                      }`}>
                        {Icon && (
                          <Icon 
                            size={18} 
                            className={`shrink-0 transition-colors ${
                              isActive ? 'text-indigo-400' : 'text-gray-400 group-hover/nav:text-indigo-400'
                            }`} 
                          />
                        )}
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links - All in one line */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center">
              Connect
            </h3>
            <div className="flex justify-center items-center gap-3 flex-nowrap overflow-x-auto">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
                    style={{ '--hover-color': social.color } as any}
                  >
                    <Icon 
                      size={18} 
                      className="text-gray-400 group-hover:text-[var(--hover-color)] transition-colors" 
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

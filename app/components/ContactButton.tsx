'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ContactButton() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useGSAP(() => {
        // Initial entrance delay based on path
        const entranceDelay = pathname === '/' ? 6 : 0.5;

        gsap.from(containerRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: entranceDelay,
            ease: 'back.out(1.7)',
        });

        // Scroll trigger to show/hide based on scroll
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    useEffect(() => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: isVisible ? 1 : 0.8,
                scale: isVisible ? 1 : 0.9,
                duration: 0.5,
            });
        }
    }, [isVisible]);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-10 right-10 z-[5000]"
        >
            <Link href="/contact" className="cursor-target relative group block">
                {/* Brand Glow effect */}
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button body - White background for Black Icon */}
                <div className="relative bg-white rounded-full p-2 shadow-2xl border-2 border-slate-100 group-hover:border-indigo-500 transition-all duration-300 transform group-hover:scale-110">
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/contact-mail.png"
                            alt="Contact Me"
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain filter "
                            priority
                        />
                    </div>
                </div>

                {/* Tooltip/Label */}
                <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 border border-indigo-500/20 shadow-xl">
                    Let&apos;s Talk!
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-slate-900/90" />
                </div>
            </Link>
        </div>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const isHovering = useRef(false);

    useGSAP(() => {
        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            if (!isHovering.current) {
                gsap.to(dotRef.current, {
                    x: clientX,
                    y: clientY,
                    duration: 0.1,
                    ease: 'power2.out',
                });

                gsap.to(ringRef.current, {
                    x: clientX,
                    y: clientY,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        };

        const handleTargetMouseEnter = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            isHovering.current = true;

            const rect = target.getBoundingClientRect();
            const style = window.getComputedStyle(target);
            const bRadius = style.borderRadius;

            gsap.killTweensOf(dotRef.current);
            gsap.killTweensOf(ringRef.current);

            // Hide dot smoothly
            gsap.to(dotRef.current, { opacity: 0, scale: 0, duration: 0.2 });

            // Transform ring to target shape and position
            gsap.to(ringRef.current, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                width: rect.width + 12,
                height: rect.height + 12,
                borderRadius: bRadius,
                borderColor: 'rgba(79, 70, 229, 0.9)',
                borderWidth: '2px',
                duration: 0.3,
                ease: 'power3.out',
            });
        };

        const handleTargetMouseLeave = () => {
            isHovering.current = false;

            gsap.killTweensOf(dotRef.current);
            gsap.killTweensOf(ringRef.current);

            gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });

            gsap.to(ringRef.current, {
                width: 32,
                height: 32,
                borderRadius: '50%',
                borderColor: 'rgba(79, 70, 229, 0.5)',
                borderWidth: '1px',
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        const updateListeners = () => {
            const targets = document.querySelectorAll('.cursor-target');
            targets.forEach(target => {
                target.removeEventListener('mouseenter', handleTargetMouseEnter as any);
                target.removeEventListener('mouseleave', handleTargetMouseLeave as any);
                target.addEventListener('mouseenter', handleTargetMouseEnter as any);
                target.addEventListener('mouseleave', handleTargetMouseLeave as any);
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        updateListeners();

        const observer = new MutationObserver(() => {
            setTimeout(updateListeners, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-indigo-500 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#6366f1]"
            />

            <div
                ref={ringRef}
                className="fixed top-0 left-0 border border-indigo-500/50 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                style={{ width: '32px', height: '32px' }}
            />
        </>
    );
}

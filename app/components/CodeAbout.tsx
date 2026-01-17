'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const AnimatedLine = ({ children, number }: { children: React.ReactNode; number: number }) => (
    <div className="code-line flex hover:bg-white/5 transition-colors px-4 py-0.5 rounded-sm">
        <span className="text-slate-600 w-8 md:w-12 text-right mr-4 select-none shrink-0 font-mono text-sm md:text-base opacity-50">{number}</span>
        <div className="font-mono text-sm md:text-base whitespace-pre-wrap break-words">{children}</div>
    </div>
);

export default function CodeAbout() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const lines = gsap.utils.toArray('.code-line');

        // Robust Animation: Trigger when container enters viewport
        gsap.from(lines, {
            y: 100,         // Come from further down
            opacity: 0,     // Start invisible
            duration: 1,
            stagger: 0.05,  // Fast ripple effect
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%', // Triggers when top of box hits 80% down viewport
                toggleActions: 'play none none reverse' // Replays if you scroll back up
            }
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="w-full max-w-5xl mx-auto my-20 bg-[#0d1117] rounded-xl shadow-2xl overflow-hidden border border-slate-800/60"
        >
            {/* Title Bar like VS Code */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                </div>
                <div className="text-xs text-slate-400 font-mono">aboutMe.tsx</div>
                <div className="w-10" />
            </div>

            <div className="p-4 md:p-8  text-slate-300">

                <AnimatedLine number={1}>
                    <span className="text-[#ff7b72]">export default</span> <span className="text-[#79c0ff]">function</span> <span className="text-[#d2a8ff]">AboutMe</span>() {'{'}
                </AnimatedLine>

                <AnimatedLine number={2}>
                    &nbsp;&nbsp;<span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">WhoAmI</span> = {'{'}
                </AnimatedLine>

                <AnimatedLine number={3}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">name</span>: <span className="text-[#a5d6ff]">&quot;Mahmoud Saeed&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={4}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">title</span>: <span className="text-[#a5d6ff]">&quot;Frontend Developer&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={5}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">about</span>: [
                </AnimatedLine>

                <AnimatedLine number={6}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;I&apos;m a Front-End Developer with a strong foundation in HTML, CSS, and JS.&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={7}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Specialized in building scalable, pixel-perfect web applications.&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={8}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Passionate about delivering high-performance user experiences.&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={9}>
                    &nbsp;&nbsp;&nbsp;&nbsp;],
                </AnimatedLine>

                <AnimatedLine number={10}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">skills</span>: {'{'}
                </AnimatedLine>

                <AnimatedLine number={11}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffa657]">languages</span>: [<span className="text-[#a5d6ff]">&quot;JavaScript&quot;</span>, <span className="text-[#a5d6ff]">&quot;TypeScript&quot;</span>, <span className="text-[#a5d6ff]">&quot;C++&quot;</span>],
                </AnimatedLine>

                <AnimatedLine number={12}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ffa657]">frontend</span>: [
                </AnimatedLine>

                <AnimatedLine number={13}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;React&quot;</span>, <span className="text-[#a5d6ff]">&quot;Next.js&quot;</span>, <span className="text-[#a5d6ff]">&quot;Redux Toolkit&quot;</span>, <span className="text-[#a5d6ff]">&quot;Tailwind&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={14}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Framer Motion&quot;</span>, <span className="text-[#a5d6ff]">&quot;GSAP&quot;</span>, <span className="text-[#a5d6ff]">&quot;Tanstack Query&quot;</span>
                </AnimatedLine>

                <AnimatedLine number={15}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </AnimatedLine>

                <AnimatedLine number={16}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'},
                </AnimatedLine>

                <AnimatedLine number={17}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">experience</span>: [
                </AnimatedLine>

                <AnimatedLine number={18}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                </AnimatedLine>

                <AnimatedLine number={19}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">company</span>: <span className="text-[#a5d6ff]">&quot;ABS.AI&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={20}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">role</span>: <span className="text-[#a5d6ff]">&quot;Frontend Developer&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={21}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">highlights</span>: [
                </AnimatedLine>

                <AnimatedLine number={22}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Built entire frontend for Yourz (UGC platform) with real-time chat.&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={23}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Developed modules for Alfie ERP (HR, Finance, Operations).&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={24}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Integrated RESTful APIs & WebSockets for live data sync.&quot;</span>
                </AnimatedLine>

                <AnimatedLine number={25}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </AnimatedLine>

                <AnimatedLine number={26}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'},'}
                </AnimatedLine>

                <AnimatedLine number={27}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                </AnimatedLine>

                <AnimatedLine number={28}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">company</span>: <span className="text-[#a5d6ff]">&quot;Athara&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={29}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">role</span>: <span className="text-[#a5d6ff]">&quot;Frontend Developer (Part-time)&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={30}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#79c0ff]">highlights</span>: [
                </AnimatedLine>

                <AnimatedLine number={31}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Built custom themes for Zid & Salla e-commerce platforms.&quot;</span>,
                </AnimatedLine>

                <AnimatedLine number={32}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Designed intuitive, user-friendly interfaces with Twig & JS.&quot;</span>
                </AnimatedLine>

                <AnimatedLine number={33}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </AnimatedLine>

                <AnimatedLine number={34}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                </AnimatedLine>

                <AnimatedLine number={35}>
                    &nbsp;&nbsp;&nbsp;&nbsp;]
                </AnimatedLine>

                <AnimatedLine number={36}>
                    &nbsp;&nbsp;{'}'}
                </AnimatedLine>

                <AnimatedLine number={37}>
                    &nbsp;&nbsp;<span className="text-[#ff7b72]">return</span> (
                </AnimatedLine>

                {/* CLICKABLE LINK TO JOURNEY */}
                <AnimatedLine number={38}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'/* '}
                    <Link href="/journey" className="text-[#27c93f] hover:underline cursor-pointer group relative inline-block">
                        Let me share my journey with you..
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#27c93f] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    {' */'}
                </AnimatedLine>

                <AnimatedLine number={39}>
                    &nbsp;&nbsp;)
                </AnimatedLine>

                <AnimatedLine number={40}>
                    {'}'}
                </AnimatedLine>

            </div>
        </div>
    );
}

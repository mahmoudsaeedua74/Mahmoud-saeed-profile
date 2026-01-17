'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code2, Briefcase, Sparkles } from 'lucide-react';
import Background from '../components/Background';
import ContactButton from '../components/ContactButton';

gsap.registerPlugin(ScrollTrigger);

const journeyItems = [
    {
        date: 'February 2023',
        title: 'Start Self Study',
        description: 'I recently started exploring the field of programming and learning C++. I have gained a basic understanding of programming fundamentals and how the field works.',
        projects: []
    },
    {
        date: 'April 2024',
        title: 'Start Researching',
        description: 'I researched different fields in tech and found myself interested in Front-End Development. I chose to begin my journey with Route.',
        projects: []
    },
    {
        date: 'June 2024',
        title: 'Start with Route',
        description: 'I started my journey with Route, gaining a deeper understanding of Front-End Development and the field as a whole.',
        projects: []
    },
    {
        date: 'August 2024',
        title: 'HTML, CSS and Bootstrap',
        description: 'Learned with Route and Eng. Osama Elzero. Focused on HTML Structure, CSS Styling, and Bootstrap.',
        projects: [
            { name: 'Daniels', url: 'https://github.com/mahmoudsaeedua74/Daniels' },
            { name: 'Mealify', url: 'https://github.com/mahmoudsaeedua74/Daniels' }
        ]
    },
    {
        date: 'October 2024',
        title: 'JavaScript Mastery',
        description: 'Mastered Core Fundamentals, ES6+, DOM, OOP, and Async/Await with Route and Jonas Schmedtmann.',
        projects: [
            { name: 'CRUD Project', url: 'https://mahmoudsaeedua74.github.io/CRUD--project/' },
            { name: 'Games OOP', url: 'https://mahmoudsaeedua74.github.io/Games-oop/' },
            { name: 'Weather App', url: 'https://mahmoudsaeedua74.github.io/weather-app/' }
        ]
    },
    {
        date: 'November 2024 - Present',
        title: 'React & Next.js Ecosystem',
        description: 'Deep dived into React (Hooks, Context, Redux) and Next.js (SSR, SSG, App Router). Learned TypeScript, Tailwind CSS, Tanstack Query and Framer Motion/GSAP.',
        projects: [
            { name: 'E-Commerce', url: 'https://e-commorce.vercel.app/' },
            { name: 'Pizza Restaurant', url: 'https://pizza-restaurant-ten.vercel.app/' }
        ]
    },
    {
        date: '2024 - Present',
        title: 'Frontend Developer @ ABS.AI (Full-time)',
        companyUrl: 'https://www.absai.dev/',
        type: 'work',
        description: 'Developed and maintained responsive web applications using React.js and Next.js. Built the entire frontend for Yourz (UGC platform). Developed essential modules for Alfie ERP (HR, Finance, Operations).',
        projects: [
            { name: 'Yourz Global', url: 'https://www.yourzglobal.com/' },
            { name: 'Alfie ERP', url: '' }
        ]
    },
    {
        date: '2024 - Present',
        title: 'Frontend Developer @ Athara (Part-time)',
        companyUrl: 'https://www.atharads.sa/',
        type: 'work',
        description: 'Built custom e-commerce themes using HTML, CSS, JavaScript, and Twig for Zid and Salla platforms. Implemented CSS improvements and designed intuitive user interfaces.',
        projects: [
            { name: 'Vlon Chocolate', url: 'https://vlonchocolate.com/' },
            { name: 'Orya World', url: 'https://orya.world/' }
        ]
    }
];

export default function JourneyPage() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Intro Animation
        gsap.from('.journey-intro', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        // 2. Precise Laser Beam
        gsap.fromTo('.progress-line-inner',
            { height: '0%' },
            {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 60%',
                    end: 'bottom 85%',
                    scrub: 1,
                }
            }
        );

        // 3. Progressive Reveal Items
        const items = gsap.utils.toArray('.timeline-item');

        items.forEach((item: any) => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');
            const words = item.querySelectorAll('.word-anim');
            const projects = item.querySelector('.timeline-projects');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'center 60%',
                    scrub: 1,
                    toggleActions: 'play reverse play reverse'
                }
            });

            tl.fromTo(dot,
                { scale: 0, opacity: 0, boxShadow: '0 0 0px rgba(0,0,0,0)' },
                { scale: 1, opacity: 1, boxShadow: '0 0 20px rgba(99,102,241,0.6)', duration: 0.5 }
            )
                .fromTo(content,
                    { x: -30, opacity: 0, filter: 'blur(5px)' },
                    { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5 },
                    '<0.1'
                )
                .fromTo(words,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.1
                    },
                    '<0.2'
                );

            if (projects) {
                tl.fromTo(projects,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    '>-0.2'
                );
            }
        });

        // 4. Outro Animation
        gsap.from('.journey-outro', {
            scrollTrigger: {
                trigger: '.journey-outro',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

    }, { scope: container });

    return (
        <div ref={container} className="relative min-h-screen bg-slate-950 text-slate-200 font-['Inter'] selection:bg-indigo-500/30 overflow-x-hidden">
            <Background />
            <ContactButton />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-12 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                {/* Intro Section */}
                <div className="journey-intro text-center mb-20 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-['Belgrano']">
                        My Journey
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                        Welcome to my professional timeline. From writing my first line of C++ to architecting complex frontend systems for enterprise clients. This is how I've evolved as a developer, step by step.
                    </p>
                </div>

                <div className="timeline-container relative pl-8 md:pl-12 border-l-2 border-white/5 ml-4 md:ml-10 space-y-24 pb-96">

                    {/* Animated Gradient Line */}
                    <div className="progress-line absolute top-0 left-[-2px] w-[4px] h-full overflow-hidden z-0">
                        <div className="progress-line-inner w-full h-[0%] bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
                    </div>

                    {journeyItems.map((item, idx) => (
                        <div key={idx} className="timeline-item relative group pb-10">
                            {/* Dot */}
                            <div
                                className={`timeline-dot absolute top-2 -left-[45px] md:-left-[61px] w-6 h-6 rounded-full border-4 border-slate-950 ${item.type === 'work' ? 'bg-emerald-500' : 'bg-indigo-500'} z-10`}
                            />

                            <div className="timeline-content flex flex-col gap-2">
                                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">{item.date}</span>

                                <h3 className={`text-2xl md:text-4xl font-black ${item.type === 'work' ? 'text-emerald-400' : 'text-white'} flex items-center flex-wrap gap-2`}>
                                    <div className="flex items-center gap-3">
                                        {item.type === 'work' && <Briefcase size={28} className="animate-bounce" />}
                                        <span className="mr-2">{item.title}</span>
                                    </div>

                                    {/* Company Link Indicator */}
                                    {item.companyUrl && (
                                        <a
                                            href={item.companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="opacity-50 hover:opacity-100 transition-opacity"
                                            title="Visit Company"
                                        >
                                            <ExternalLink size={20} className="text-slate-400" />
                                        </a>
                                    )}
                                </h3>

                                {/* Description with Word Splitting for Animation */}
                                <div className="text-slate-400 leading-relaxed text-lg md:text-xl max-w-3xl mt-4">
                                    {item.description.split(" ").map((word, wIdx) => (
                                        <span key={wIdx} className="word-anim inline-block mr-[0.3em] opacity-0">
                                            {word}
                                        </span>
                                    ))}
                                </div>

                                {item.projects.length > 0 && (
                                    <div className="timeline-projects flex flex-wrap gap-4 mt-6 opacity-0">
                                        {item.projects.map((project, pIdx) => (
                                            project.url ? (
                                                <a
                                                    key={pIdx}
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
                                                >
                                                    <Code2 size={18} className="text-indigo-500 group-hover/btn:scale-110 transition-transform" />
                                                    <span className="font-bold text-slate-300 group-hover/btn:text-white">{project.name}</span>
                                                    <ExternalLink size={14} className="text-slate-600 group-hover/btn:text-indigo-400" />
                                                </a>
                                            ) : (
                                                <div
                                                    key={pIdx}
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800/50 cursor-default opacity-80"
                                                >
                                                    <Code2 size={18} className="text-slate-600" />
                                                    <span className="font-bold text-slate-400">{project.name}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                </div>

                {/* Outro / Future Section */}
                <div className="journey-outro mt-32 mb-40 text-center space-y-8 p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-500/20 text-indigo-400 mb-4 animate-pulse">
                        <Sparkles size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-['Belgrano']">
                        To Be Continued...
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The journey doesn't stop here. I am constantly learning, watching the latest tech trends, and pushing the boundaries of what's possible on the web. Who knows what the next chapter holds?
                    </p>
                    <div className="pt-6">
                        <span className="inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-sm">
                            Currently Learning: Advanced 3D WebGL & AI Integration
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}

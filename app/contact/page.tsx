'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.contact-animate', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <div className="relative min-h-screen">
            <Background />
            <Navbar />

            <main ref={containerRef} className="relative z-10 pt-40 px-6 max-w-5xl mx-auto">
                <h1 className="contact-animate text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12">
                    Let&apos;s Build <br /> Something Great
                </h1>

                <div className="contact-animate grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400">
                    <div className="space-y-6">
                        <p className="text-xl">
                            I&apos;m currently open to new opportunities and collaborations.
                            Whether you have a question or just want to say hi, I&apos;ll try
                            my best to get back to you!
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-white font-semibold">Email</h3>
                            <a href="mailto:mahmoudsaeed0112074@gmail.com" className="text-2xl hover:text-indigo-400 transition-colors">
                                mahmoudsaeed0112074@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* A simple placeholder form would go here */}
                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-500/20">
                        <p className="italic text-slate-500">Form implementation coming soon...</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

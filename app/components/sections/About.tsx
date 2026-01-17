'use client';

import CodeAbout from '../CodeAbout';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 relative z-10 w-full bg-black/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-[1440px] mx-auto w-full">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-['Belgrano']">
            About Me
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
        </div>

        {/* The GSAP Animated Code View */}
        <CodeAbout />
      </div>
    </section>
  );
}

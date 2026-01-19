'use client';

import Navbar from './Navbar';
import Sidebar from './Sidebar'; // RESTORED
import Background from './Background';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

import Chatbot from './Chatbot';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background */}
      <Background />

      {/* Fixed Navbar - stays on top */}
      <Navbar />

      {/* Scroll-Triggered Sidebar - Hidden in Hero, appears after */}
      <Sidebar />

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Scrolling content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}

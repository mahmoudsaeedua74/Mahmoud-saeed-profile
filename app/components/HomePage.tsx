'use client';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Background from './Background';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

import ContactButton from './ContactButton';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background */}
      <Background />

      {/* Fixed Navbar - stays on top */}
      <Navbar />

      {/* Fixed Sidebar - stays on left */}
      <Sidebar />

      {/* Floating Contact Button */}
      <ContactButton />

      {/* Scrolling content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}


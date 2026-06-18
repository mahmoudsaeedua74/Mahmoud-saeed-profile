'use client';

import Sidebar from './Sidebar';
import Background from './Background';
import SectionDivider from './SectionDivider';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import ProcessPanels from './sections/ProcessPanels';
import Services from './sections/Services';
import Stats from './sections/Stats';
import TechnicalSkills from './sections/TechnicalSkills';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

import Chatbot from './Chatbot';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Sidebar />
      <Chatbot />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <SectionDivider />
        <Services />
        <SectionDivider intense />
        <Projects />
        <SectionDivider />
        <Testimonials />
        <SectionDivider intense />
        <ProcessPanels />
        <SectionDivider />
        <About />
        <SectionDivider />
        <TechnicalSkills />
        <SectionDivider intense />
        <Contact />
      </main>
    </div>
  );
}

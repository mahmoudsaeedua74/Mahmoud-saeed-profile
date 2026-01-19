'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Project data - in a real app, this would come from an API or CMS
const allProjects = [
  {
    id: '1',
    title: 'Dr. Games',
    slug: 'drgames',
    image: '/drgames-hero.png',
    color: '#6366f1',
    description: 'Advanced Hybrid Gaming Marketplace',
    fullDescription: 'A comprehensive gaming marketplace platform that combines traditional and modern gaming experiences. Built with cutting-edge technology to deliver seamless user experiences.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'GSAP'],
    link: 'https://example.com',
  },
  {
    id: '2',
    title: 'Crawleo',
    slug: 'crawleo',
    image: '/crawleo4.png',
    color: '#10b981',
    description: 'Real-Time Web Intelligence API',
    fullDescription: 'A powerful web scraping and intelligence API that provides real-time data extraction and analysis capabilities for businesses.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    link: 'https://example.com',
  },
  {
    id: '3',
    title: 'Invia',
    slug: 'invia',
    image: '/invia5.png',
    color: '#8b5cf6',
    description: 'Modern Logistics Platform',
    fullDescription: 'A complete logistics management system designed to streamline shipping and delivery operations with real-time tracking.',
    technologies: ['React', 'TypeScript', 'Express', 'MySQL'],
    link: 'https://example.com',
  },
  {
    id: '4',
    title: '360 Home Offers',
    slug: '360homeoffers',
    image: '/houses1.png',
    color: '#f59e0b',
    description: 'Real Estate Platform Redesign',
    fullDescription: 'A complete redesign of a real estate platform focusing on user experience and modern design principles.',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    link: 'https://example.com',
  },
  {
    id: '5',
    title: 'Crettiva',
    slug: 'crettiva',
    image: '/c1.png',
    color: '#ec4899',
    description: 'Digital Agency Portfolio',
    fullDescription: 'A stunning portfolio website for a digital agency showcasing their work and services with elegant animations.',
    technologies: ['React', 'GSAP', 'Framer Motion', 'Contentful'],
    link: 'https://example.com',
  },
  {
    id: '6',
    title: 'Movie-Boi',
    slug: 'movie-boi-react-imdb-netflex-clone',
    image: '/Screenshot (49).png',
    color: '#ef4444',
    description: 'React-IMDB-Netflix Clone',
    fullDescription: 'A full-featured movie streaming platform clone with search, recommendations, and user accounts.',
    technologies: ['React', 'Redux', 'Firebase', 'TMDB API'],
    link: 'https://example.com',
  },
  {
    id: '7',
    title: 'Al Manara',
    slug: 'almenara-furniture-transfer',
    image: '/ma5.png',
    color: '#06b6d4',
    description: 'E-commerce Furniture Platform',
    fullDescription: 'An e-commerce platform specializing in furniture with advanced filtering and visualization features.',
    technologies: ['Next.js', 'Stripe', 'Sanity CMS', 'Tailwind CSS'],
    link: 'https://example.com',
  },
  {
    id: '8',
    title: "A'atene",
    slug: 'aatene-ecommerce',
    image: '/at1.png',
    color: '#14b8a6',
    description: 'E-commerce Platform',
    fullDescription: 'A modern e-commerce solution with advanced product management and checkout flow.',
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    link: 'https://example.com',
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const project = allProjects.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (!project) {
      router.push('/');
    }
  }, [project, router]);

  useGSAP(() => {
    if (!containerRef.current || !project) return;

    // Entrance animations
    const tl = gsap.timeline();

    tl.from(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.5');

    // Parallax effect on scroll
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, { scope: containerRef, dependencies: [project] });

  if (!project) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)`,
        }}
      />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Project Image Hero */}
      <div 
        ref={imageRef}
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, black 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-24 py-16"
      >
        {/* Project Header */}
        <div className="mb-12">
          <div 
            className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}40`,
            }}
          >
            {project.description}
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl font-bold uppercase tracking-tighter hover:scale-105 transition-transform"
              style={{
                background: project.color,
                color: 'white',
              }}
            >
              View Project
            </a>
          )}
          <button
            onClick={() => router.push('/#projects')}
            className="px-8 py-4 rounded-2xl font-bold uppercase tracking-tighter border-2 border-white/20 hover:border-white/40 transition-all"
          >
            All Projects
          </button>
        </div>
      </div>
    </div>
  );
}

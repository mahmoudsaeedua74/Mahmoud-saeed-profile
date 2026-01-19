'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Code2, ShoppingCart, MessageSquare, Layers, Globe, Rocket } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

// Extended project data structure
interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  color: string;
  description: string;
  technologies: string[];
  projectType: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Dr. Games',
    slug: 'drgames',
    image: '/houses1.png',
    color: '#6366f1',
    description: 'Advanced Hybrid Gaming Marketplace',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    projectType: 'SaaS'
  },
  {
    id: '2',
    title: 'Crawleo',
    slug: 'crawleo',
    image: '/houses1.png',
    color: '#10b981',
    description: 'Real-Time Web Intelligence API',
    technologies: ['React', 'Next.js', 'TypeScript'],
    projectType: 'SaaS'
  },
  {
    id: '3',
    title: 'Invia',
    slug: 'invia',
    image: '/houses1.png',
    color: '#8b5cf6',
    description: 'Modern Logistics Platform',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    projectType: 'ERP System'
  },
  {
    id: '4',
    title: '360 Home Offers',
    slug: '360homeoffers',
    image: '/houses1.png',
    color: '#f59e0b',
    description: 'Real Estate Platform Redesign',
    technologies: ['React', 'Next.js', 'Tailwind'],
    projectType: 'Landing Page'
  },
  {
    id: '5',
    title: 'Crettiva',
    slug: 'crettiva',
    image: '/houses1.png',
    color: '#ec4899',
    description: 'Digital Agency Portfolio',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    projectType: 'Landing Page'
  },
  {
    id: '6',
    title: 'Movie-Boi',
    slug: 'movie-boi-react-imdb-netflex-clone',
    image: '/houses1.png',
    color: '#ef4444',
    description: 'React-IMDB-Netflix Clone',
    technologies: ['React', 'JavaScript', 'CSS'],
    projectType: 'SaaS'
  },
  {
    id: '7',
    title: 'Al Manara',
    slug: 'almenara-furniture-transfer',
    image: '/houses1.png',
    color: '#06b6d4',
    description: 'E-commerce Furniture Platform',
    technologies: ['SALLA', 'HTML', 'CSS', 'JavaScript'],
    projectType: 'E-commerce'
  },
  {
    id: '8',
    title: "A'atene",
    slug: 'aatene-ecommerce',
    image: '/houses1.png',
    color: '#14b8a6',
    description: 'E-commerce Platform',
    technologies: ['ZID', 'HTML', 'CSS', 'JavaScript'],
    projectType: 'E-commerce'
  },
];

// Filter options
const technologyFilters = [
  { id: 'html', label: 'HTML', icon: Code2 },
  { id: 'css', label: 'CSS', icon: Code2 },
  { id: 'js', label: 'JavaScript', icon: Code2 },
  { id: 'ts', label: 'TypeScript', icon: Code2 },
  { id: 'tailwind', label: 'Tailwind', icon: Code2 },
  { id: 'react', label: 'React', icon: Code2 },
  { id: 'next', label: 'Next.js', icon: Code2 },
  { id: 'zid', label: 'ZID', icon: ShoppingCart },
  { id: 'salla', label: 'SALLA', icon: ShoppingCart },
];

const projectTypeFilters = [
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'landingpage', label: 'Landing Page', icon: Globe },
  { id: 'erp', label: 'ERP System', icon: Layers },
  { id: 'chatbot', label: 'Chat Bot', icon: MessageSquare },
  { id: 'saas', label: 'SaaS', icon: Rocket },
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechFilters, setSelectedTechFilters] = useState<string[]>([]);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Technology filters
      const matchesTech = selectedTechFilters.length === 0 ||
        selectedTechFilters.some(tech => 
          project.technologies.some(pTech => 
            pTech.toLowerCase().includes(tech.toLowerCase())
          )
        );

      // Project type filter
      const matchesType = selectedTypeFilters.length === 0 ||
        selectedTypeFilters.some(type => {
          const typeMap: { [key: string]: string } = {
            'ecommerce': 'E-commerce',
            'landingpage': 'Landing Page',
            'erp': 'ERP System',
            'chatbot': 'Chat Bot',
            'saas': 'SaaS'
          };
          return project.projectType === typeMap[type];
        });

      return matchesSearch && matchesTech && matchesType;
    });
  }, [searchQuery, selectedTechFilters, selectedTypeFilters]);

  // Page entrance animations
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Back button animation
    const backButton = containerRef.current.previousElementSibling?.querySelector('button') || 
                       document.querySelector('.fixed.top-8.left-8');
    if (backButton) {
      gsap.fromTo(backButton,
        {
          opacity: 0,
          x: -30,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
        }
      );
    }

    // Title animation - animate the SectionTitle component
    const titleSection = containerRef.current.querySelector('.mb-12.text-center');
    if (titleSection) {
      const titleElement = titleSection.querySelector('.hidden.lg\\:flex');
      const mobileTitle = titleSection.querySelector('h1');
      
      if (titleElement) {
        tl.fromTo(titleElement,
          {
            opacity: 0,
            y: -50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          0
        );
      }
      
      if (mobileTitle) {
        tl.fromTo(mobileTitle,
          {
            opacity: 0,
            y: -30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          0
        );
      }
    }

    // Search container animation
    const searchRef = containerRef.current.querySelector('.search-container');
    if (searchRef) {
      tl.fromTo(searchRef,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.2
      );
    }

    // Filters container animation
    const filtersRef = containerRef.current.querySelector('.filters-container');
    if (filtersRef) {
      tl.fromTo(filtersRef,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.4
      );

      // Animate filter buttons with stagger
      const filterButtons = filtersRef.querySelectorAll('.filter-btn');
      if (filterButtons.length > 0) {
        tl.fromTo(filterButtons,
          {
            opacity: 0,
            scale: 0.8,
            y: 10,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'back.out(1.2)',
          },
          0.5
        );
      }
    }

    // Projects grid animation
    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
      if (projectCards.length > 0) {
        tl.fromTo(projectCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.7,
            stagger: {
              amount: 0.6,
              from: 'start',
            },
            ease: 'power3.out',
          },
          0.6
        );
      }
    }
  }, { scope: containerRef });

  // Animate filtered projects when filters change
  useGSAP(() => {
    if (!projectsGridRef.current) return;

    const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(projectCards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, { scope: projectsGridRef, dependencies: [filteredProjects] });

  const toggleTechFilter = (filterId: string) => {
    setSelectedTechFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleTypeFilter = (filterId: string) => {
    setSelectedTypeFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTechFilters([]);
    setSelectedTypeFilters([]);
  };

  const hasActiveFilters = searchQuery || selectedTechFilters.length > 0 || selectedTypeFilters.length > 0;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Back button */}
      <div className="fixed top-8 left-8 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24 py-24 pt-32">
        {/* Header */}
        <div className="mb-12 text-center">
          <SectionTitle text="ALL PROJECTS" containerRef={containerRef} />
          {/* Mobile title */}
          <h1 className="lg:hidden text-4xl md:text-6xl font-black text-white mb-4 text-center uppercase tracking-tighter">
            All Projects
          </h1>
        </div>

        {/* Search Container */}
        <div className="search-container mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filters Container */}
        <div className="filters-container mb-12">
          {/* Technology Filters */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {technologyFilters.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedTechFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleTechFilter(filter.id)}
                    className={`filter-btn flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Type Filters */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Project Type</h3>
            <div className="flex flex-wrap gap-3">
              {projectTypeFilters.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedTypeFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleTypeFilter(filter.id)}
                    className={`filter-btn flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-6 px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Clear all filters
            </button>
          )}
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div 
            ref={projectsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/project/${project.slug}`)}
                className="project-card relative group cursor-pointer"
              >
                <div className="relative w-full h-[300px] rounded-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${project.color}20, transparent)` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-xl font-bold uppercase mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium bg-white/10 rounded text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  const emptyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!emptyRef.current) return;

    gsap.fromTo(emptyRef.current,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      }
    );
  }, { scope: emptyRef });

  return (
    <div 
      ref={emptyRef}
      className="text-center py-20"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30">
          <Search size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          No Projects Found
        </h3>
        <p className="text-gray-400 mb-6">
          We couldn't find any projects matching your filters. Try adjusting your search or filters.
        </p>
        <p className="text-sm text-gray-500 italic">
          Coming soon...
        </p>
      </div>
    </div>
  );
}

export type ProjectCategory =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'zid'
  | 'salla';

export const projectCategories: {
  id: ProjectCategory | 'all';
  label: string;
}[] = [
  { id: 'all', label: 'All Work' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'zid', label: 'Zid Platform' },
  { id: 'salla', label: 'Salla Platform' },
];

export interface ProjectMetric {
  v: string;
  l: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tag: string;
  color: string;
  gradient: string;
  description: string;
  image: string;
  video?: string;
  metrics: ProjectMetric[];
  year: string;
  role: string;
  projectType: string;
  client?: string;
  fullDescription: string;
  problem: string;
  solution: string;
  outcome: string;
  features: string[];
  technologies: string[];
  gallery: string[];
  link?: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Dr. Games',
    slug: 'drgames',
    tag: 'Gaming Marketplace',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #312e81 100%)',
    description:
      'Advanced hybrid gaming marketplace with seamless browsing, checkout, and immersive product experiences.',
    image: '/drgames-hero.png',
    metrics: [
      { v: '+42%', l: 'Engagement' },
      { v: '1.1s', l: 'Load time' },
      { v: '98', l: 'Performance' },
    ],
    year: '2024',
    role: 'Full-Stack Developer',
    projectType: 'E-commerce / SaaS',
    fullDescription:
      'Dr. Games is a hybrid gaming marketplace built to unify digital and physical game commerce under one fast, conversion-focused experience. The platform handles catalog browsing, wishlists, checkout, and account management with a polished UI tuned for gamers.',
    problem:
      'The client needed a single storefront that could sell game keys, physical titles, and bundles without feeling fragmented. Legacy flows were slow, hard to navigate on mobile, and lacked a cohesive brand experience.',
    solution:
      'Designed and built a Next.js storefront with optimized product discovery, dynamic filtering, and a checkout flow engineered for speed. GSAP micro-interactions and a dark gaming aesthetic reinforce brand identity while keeping Core Web Vitals strong.',
    outcome:
      'Engagement rose significantly after launch, with faster load times and a cleaner purchase path. The platform now supports scalable catalog growth and future marketplace features.',
    features: [
      'Hybrid digital + physical product catalog',
      'Advanced search, filters, and category navigation',
      'Wishlist, cart, and streamlined checkout',
      'Account dashboard with order history',
      'Mobile-first responsive layout',
      'Performance-optimized media and lazy loading',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'GSAP', 'Tailwind CSS'],
    gallery: ['/drgames-hero.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'fullstack',
  },
  {
    id: '2',
    title: 'Crawleo',
    slug: 'crawleo',
    tag: 'Web Intelligence API',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
    description:
      'Real-time web intelligence API for scraping, monitoring, and structured data extraction at scale.',
    image: '/crawleo4.png',
    metrics: [
      { v: '10M+', l: 'Requests/mo' },
      { v: '99.9%', l: 'Uptime' },
      { v: '<200ms', l: 'Response' },
    ],
    year: '2024',
    role: 'Backend Architect',
    projectType: 'API / SaaS',
    fullDescription:
      'Crawleo is a web intelligence platform that exposes scraping, monitoring, and structured extraction through a developer-friendly API. It targets teams that need reliable data pipelines without maintaining fragile scraper infrastructure.',
    problem:
      'Businesses relied on brittle scrapers and manual monitoring. Data quality was inconsistent, failures were hard to detect, and scaling request volume required constant engineering overhead.',
    solution:
      'Built a FastAPI backend with queue-based workers, Redis caching, and PostgreSQL for job state. Added rate limiting, retry policies, and structured response schemas so clients integrate predictably.',
    outcome:
      'The API handles high monthly request volume with sub-200ms responses on cached routes and strong uptime. Teams can ship data products faster with less ops burden.',
    features: [
      'REST API for scrape and monitor jobs',
      'Scheduled and on-demand extraction',
      'Structured JSON output schemas',
      'Redis-backed caching layer',
      'Job status, retries, and error reporting',
      'API keys and usage dashboards',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery'],
    gallery: ['/crawleo4.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'backend',
  },
  {
    id: '3',
    title: 'Invia',
    slug: 'invia',
    tag: 'Logistics Platform',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
    description:
      'Modern logistics platform with live tracking, fleet management, and streamlined delivery workflows.',
    image: '/invia5.png',
    metrics: [
      { v: '+35%', l: 'Efficiency' },
      { v: '24/7', l: 'Tracking' },
      { v: '50K+', l: 'Shipments' },
    ],
    year: '2023',
    role: 'Full-Stack Developer',
    projectType: 'ERP / Logistics',
    fullDescription:
      'Invia is a logistics operations platform for managing shipments, drivers, and delivery status in real time. Dashboards give ops teams visibility while customers receive accurate tracking updates.',
    problem:
      'Dispatch teams used spreadsheets and disconnected tools. Shipment status was often outdated, and customers had little visibility into delivery progress.',
    solution:
      'Delivered a React + Express application with role-based dashboards, live status updates, and route-friendly mobile views for drivers. MySQL stores operational data with clear audit trails.',
    outcome:
      'Operational efficiency improved with centralized tracking and fewer manual status updates. The platform scales to tens of thousands of shipments.',
    features: [
      'Real-time shipment tracking',
      'Driver and fleet management',
      'Admin and dispatcher dashboards',
      'Customer-facing tracking pages',
      'Status notifications and history',
      'Role-based access control',
    ],
    technologies: ['React', 'TypeScript', 'Express', 'MySQL', 'Socket.io', 'Tailwind CSS'],
    gallery: ['/invia5.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'fullstack',
  },
  {
    id: '4',
    title: '360 Home Offers',
    slug: '360homeoffers',
    tag: 'Real Estate',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #92400e 100%)',
    description:
      'Complete real estate platform redesign focused on listings, lead capture, and conversion-driven UX.',
    image: '/houses1.png',
    metrics: [
      { v: '+28%', l: 'Leads' },
      { v: '2.4s', l: 'Load time' },
      { v: '96', l: 'Performance' },
    ],
    year: '2023',
    role: 'Frontend Lead',
    projectType: 'Real Estate',
    fullDescription:
      '360 Home Offers is a real estate platform redesign built to showcase listings, capture qualified leads, and guide buyers through a trustworthy browsing experience.',
    problem:
      'The previous site felt dated, loaded slowly, and buried listings behind confusing navigation. Lead forms had high drop-off on mobile.',
    solution:
      'Rebuilt the frontend with Next.js and Tailwind, introduced map-friendly listing cards, sticky CTAs, and simplified lead forms. Prisma + PostgreSQL power listing and inquiry data.',
    outcome:
      'Lead volume increased after launch with improved mobile conversion and clearer property presentation.',
    features: [
      'Property listing grid and detail pages',
      'Map and filter-based search',
      'Lead capture forms with validation',
      'Agent and inquiry management',
      'SEO-friendly listing URLs',
      'Responsive image galleries',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    gallery: ['/houses1.png'],
    link: 'https://example.com',
    category: 'frontend',
  },
  {
    id: '5',
    title: 'Crettiva',
    slug: 'crettiva',
    tag: 'Agency Portfolio',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
    description:
      'Digital agency portfolio with bold motion design, case studies, and a polished brand presence.',
    image: '/c1.png',
    metrics: [
      { v: '+55%', l: 'Inquiries' },
      { v: '1.8s', l: 'Load time' },
      { v: '97', l: 'Performance' },
    ],
    year: '2023',
    role: 'Creative Developer',
    projectType: 'Portfolio / Marketing',
    fullDescription:
      'Crettiva is a digital agency portfolio engineered to impress: bold typography, scroll-driven motion, and case-study layouts that turn visitors into inbound leads.',
    problem:
      'The agency’s old site failed to reflect their creative quality. Case studies were hard to browse and the brand felt generic.',
    solution:
      'Crafted a React experience with GSAP and Framer Motion, modular case-study sections, and a CMS-friendly structure via Contentful for easy updates.',
    outcome:
      'Inbound inquiries rose sharply. The site became a sales asset that demonstrates craft before the first meeting.',
    features: [
      'Scroll-driven hero and section reveals',
      'Case study templates',
      'Services and team sections',
      'Contact and inquiry flows',
      'CMS-managed content',
      'Performance-tuned animations',
    ],
    technologies: ['React', 'GSAP', 'Framer Motion', 'Contentful', 'Tailwind CSS'],
    gallery: ['/c1.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'frontend',
  },
  {
    id: '6',
    title: 'Movie-Boi',
    slug: 'movie-boi-react-imdb-netflex-clone',
    tag: 'Streaming Clone',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)',
    description:
      'Full-featured IMDB/Netflix-style streaming clone with search, watchlists, and rich media UI.',
    image: '/Screenshot (49).png',
    metrics: [
      { v: '5K+', l: 'Titles' },
      { v: '4.8★', l: 'Rating' },
      { v: '100%', l: 'Responsive' },
    ],
    year: '2022',
    role: 'Frontend Developer',
    projectType: 'Streaming / Demo',
    fullDescription:
      'Movie-Boi is a Netflix and IMDB-inspired streaming UI clone showcasing rich media layouts, search, categories, and user lists — built as a front-end portfolio piece with real API integration.',
    problem:
      'Needed a flagship front-end demo that proves skill with complex UI patterns: carousels, detail modals, search, and authenticated user flows.',
    solution:
      'Built with React and Redux, integrated TMDB API for live movie data, Firebase for auth and watchlists, and responsive layouts mirroring modern streaming apps.',
    outcome:
      'A polished demo app that demonstrates component architecture, state management, and media-heavy UI performance.',
    features: [
      'TMDB-powered movie and TV catalog',
      'Search, genres, and trending rows',
      'Title detail pages with cast and trailers',
      'User auth and watchlists',
      'Responsive Netflix-style layout',
      'Redux state management',
    ],
    technologies: ['React', 'Redux', 'Firebase', 'TMDB API', 'CSS3'],
    gallery: ['/Screenshot (49).png', '/houses1.png'],
    link: 'https://example.com',
    category: 'frontend',
  },
  {
    id: '7',
    title: 'Al Manara',
    slug: 'almenara-furniture-transfer',
    tag: 'Salla Store',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #164e63 100%)',
    description:
      'Custom Salla theme for a furniture e-commerce brand with rich product pages and conversion-focused UX.',
    image: '/ma5.png',
    metrics: [
      { v: '+32%', l: 'Sales' },
      { v: '1.9s', l: 'Load time' },
      { v: '95', l: 'Performance' },
    ],
    year: '2023',
    role: 'Salla Theme Developer',
    projectType: 'E-commerce / Salla',
    fullDescription:
      'Al Manara is a fully customized Salla storefront for furniture and home goods, built to showcase large catalogs, promotions, and a smooth mobile shopping experience.',
    problem:
      'The default store layout did not reflect the brand and made furniture browsing feel cluttered on mobile devices.',
    solution:
      'Developed a custom Salla theme with tailored product cards, category layouts, and optimized checkout flow aligned with the brand identity.',
    outcome:
      'Improved sales and browsing time after launch with a cleaner catalog structure and faster mobile experience.',
    features: [
      'Custom Salla theme architecture',
      'Product and category templates',
      'Mobile-first furniture catalog UX',
      'Promotions and banner sections',
      'SEO-friendly store structure',
      'Performance-optimized assets',
    ],
    technologies: ['Salla', 'HTML', 'CSS', 'JavaScript', 'Liquid'],
    gallery: ['/ma5.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'fullstack',
  },
  {
    id: '8',
    title: "A'atene",
    slug: 'aatene-ecommerce',
    tag: 'Zid Store',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #115e59 100%)',
    description:
      'Premium Zid e-commerce theme with elegant product presentation and streamlined checkout.',
    image: '/at1.png',
    metrics: [
      { v: '+40%', l: 'Conversion' },
      { v: '2.0s', l: 'Load time' },
      { v: '94', l: 'Performance' },
    ],
    year: '2023',
    role: 'Zid Theme Developer',
    projectType: 'E-commerce / Zid',
    fullDescription:
      "A'atene is a Zid-powered e-commerce experience focused on premium product presentation, brand storytelling, and a frictionless purchase journey.",
    problem:
      'The merchant needed a luxury feel that default Zid templates could not deliver, especially on collection and product detail pages.',
    solution:
      'Built a custom Zid theme with refined typography, curated layouts, and conversion-oriented product detail sections.',
    outcome:
      'Higher conversion rates and stronger brand perception across mobile and desktop storefronts.',
    features: [
      'Custom Zid theme development',
      'Collection and PDP layouts',
      'Brand-led homepage sections',
      'Optimized mobile checkout',
      'Marketing landing blocks',
      'Fast-loading storefront assets',
    ],
    technologies: ['Zid', 'HTML', 'CSS', 'JavaScript'],
    gallery: ['/at1.png', '/houses1.png'],
    link: 'https://example.com',
    category: 'fullstack',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

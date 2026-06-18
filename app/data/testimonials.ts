export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Mahmoud delivered a polished storefront on time. Communication was clear and the theme performance exceeded our expectations.',
    name: 'E-commerce Client',
    role: 'Salla Store Owner',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Strong React skills and attention to detail. He understood our ERP requirements quickly and shipped stable modules.',
    name: 'Product Lead',
    role: 'ABS.AI',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'From the first meeting to launch, the process felt structured. Great full-stack work on both UI and backend APIs.',
    name: 'Startup Founder',
    role: 'SaaS Project',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'Our Zid theme looks premium and loads fast. Conversion improved after launch — highly recommend his e-commerce work.',
    name: 'Store Manager',
    role: 'Zid Merchant',
    rating: 5,
  },
  {
    id: '5',
    quote:
      'Clean code, smooth animations, and zero drama in delivery. Mahmoud is the developer you want on a tight deadline.',
    name: 'Agency Director',
    role: 'Digital Agency',
    rating: 5,
  },
  {
    id: '6',
    quote:
      'He rebuilt our dashboard with Next.js and the UX feels night and day better. Responsive, fast, and easy to maintain.',
    name: 'Operations Manager',
    role: 'Logistics Platform',
    rating: 5,
  },
  {
    id: '7',
    quote:
      'Excellent communicator — weekly updates, clear scope, and thoughtful suggestions that saved us time and budget.',
    name: 'Product Owner',
    role: 'FinTech Startup',
    rating: 5,
  },
  {
    id: '8',
    quote:
      'The GSAP scroll experience on our landing page got real compliments from investors. Polished and professional.',
    name: 'Co-Founder',
    role: 'Tech Startup',
    rating: 5,
  },
  {
    id: '9',
    quote:
      'Backend APIs were well documented and integrated smoothly with our mobile app. Solid full-stack partner.',
    name: 'Mobile Lead',
    role: 'Health App',
    rating: 5,
  },
  {
    id: '10',
    quote:
      'Would hire again without hesitation. Delivered a custom Salla theme that matches our brand perfectly.',
    name: 'Brand Owner',
    role: 'Fashion Store',
    rating: 5,
  },
];

export const testimonialRowA = testimonials.filter((_, i) => i % 2 === 0);
export const testimonialRowB = testimonials.filter((_, i) => i % 2 === 1);

import type { LucideIcon } from 'lucide-react';
import { BookOpen, Briefcase, Code2, Rocket, Store } from 'lucide-react';

export interface TimelineItem {
  tag: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const timelineItems: TimelineItem[] = [
  {
    tag: '2023',
    title: 'Self Study & Foundations',
    desc: 'Started exploring programming with C++ and core CS fundamentals — logic, problem solving, and how software systems work.',
    icon: BookOpen,
  },
  {
    tag: '2024',
    title: 'Route Academy — Frontend Path',
    desc: 'Committed to front-end development through Route: HTML, CSS, JavaScript, React, and modern tooling with real projects.',
    icon: Code2,
  },
  {
    tag: '2024 — Present',
    title: 'Frontend Developer @ ABS.AI',
    desc: 'Building production React & Next.js apps — Yourz UGC platform, Alfie ERP modules, and scalable client-facing products.',
    icon: Briefcase,
  },
  {
    tag: '2024 — Present',
    title: 'Themes @ Athara — Zid & Salla',
    desc: 'Custom e-commerce themes and storefront UX for Saudi merchants on Zid and Salla platforms.',
    icon: Store,
  },
  {
    tag: 'Now',
    title: 'Full-Stack Freelance & Portfolio',
    desc: 'End-to-end delivery: meetings, scope, UI, APIs, launch — helping clients ship products that perform and convert.',
    icon: Rocket,
  },
];

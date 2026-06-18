export interface ProcessStep {
  tag: string;
  title: string;
  desc: string;
  points: string[];
  gradient: string;
  optional?: boolean;
}

export const processSteps: ProcessStep[] = [
  {
    tag: 'Discovery',
    title: 'We Meet & I Listen',
    desc: 'Every project starts with a real conversation — video call or chat. I learn your business, users, goals, and what success looks like for you.',
    points: ['Kickoff meeting', 'Goals & users', 'Budget & timeline'],
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #312e81 100%)',
  },
  {
    tag: 'Scope',
    title: 'Understanding the Full Picture',
    desc: 'I break the idea into features, pages, flows, and technical requirements. You get clarity before a single line of code is written.',
    points: ['Feature map', 'Tech stack', 'Milestones'],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #1e1b4b 100%)',
  },
  {
    tag: 'Design & UI',
    title: 'Frontend Architecture & UI',
    desc: 'Wireframes become polished interfaces — responsive, accessible, and aligned with your brand. GSAP motion where it adds value.',
    points: ['Component system', 'Responsive UI', 'Motion design'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
  },
  {
    tag: 'Backend',
    title: 'APIs, Data & Integrations',
    desc: 'As a full-stack developer I build the server side too — REST APIs, auth, databases, payments, and third-party integrations.',
    points: ['APIs & auth', 'Database design', 'Integrations'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
  },
  {
    tag: 'Build',
    title: 'Iterative Development',
    desc: 'Short cycles with updates after each milestone. You see progress early, give feedback, and we adjust before launch.',
    points: ['Weekly updates', 'Staging previews', 'Fast iterations'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #92400e 100%)',
  },
  {
    tag: 'Launch',
    title: 'Deploy, Handoff & Support',
    desc: 'Production deployment, documentation, and post-launch support. Your product goes live stable, fast, and ready to grow.',
    points: ['Deployment', 'Documentation', 'Ongoing support'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
  },
];

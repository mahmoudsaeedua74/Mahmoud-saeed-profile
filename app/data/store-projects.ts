export type StoreProjectCategory = 'css' | 'sdk' | 'theme';

export type StoreProject = {
  id: string;
  category: StoreProjectCategory;
  title: string;
  platform: 'zid' | 'salla';
  tag: string;
  screenshot?: string;
  themeSlug?: string;
  year: string;
  link?: string;
  comingSoon?: boolean;
};

export type StoreWorkFilter = 'all' | 'css' | 'sdk';

export const storeWorkFilters: { id: StoreWorkFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'css', label: 'Custom CSS' },
  { id: 'sdk', label: 'SDK & Themes' },
];

export const platformColor: Record<StoreProject['platform'], string> = {
  zid: '#818cf8',
  salla: '#34d399',
};

export const storeProjects: StoreProject[] = [
  {
    id: 'vlon',
    category: 'css',
    title: 'Vlon',
    platform: 'zid',
    tag: 'Premium French chocolate — CSS refinements',
    screenshot: '/projects/vlon.png',
    year: '2025',
    link: 'https://vlonchocolate.com/',
  },
  {
    id: 'bahiah',
    category: 'css',
    title: 'Bahiah',
    platform: 'zid',
    tag: 'Abayas & Saudi fashion — custom CSS',
    screenshot: '/projects/bahiah.png',
    year: '2025',
    link: 'https://bahiahofficial.com/',
  },
  {
    id: 'royalmarina',
    category: 'css',
    title: 'Royal Marina',
    platform: 'zid',
    tag: 'Yacht trips & charters — custom CSS',
    screenshot: '/projects/royalmarina.png',
    year: '2025',
    link: 'https://royalmarinas.com/',
  },
  {
    id: 'taln',
    category: 'css',
    title: 'Taln',
    platform: 'salla',
    tag: 'LinkedIn & CV services — custom CSS',
    screenshot: '/projects/taln.png',
    year: '2025',
    link: 'https://taln.sa/',
  },
  {
    id: 'dafa',
    category: 'css',
    title: 'Dafa',
    platform: 'zid',
    tag: 'Home care & cleaning — custom CSS',
    screenshot: '/projects/dafa.png',
    year: '2025',
    link: 'https://dafa.com.sa/',
  },
  {
    id: 'orya',
    category: 'css',
    title: 'Orya',
    platform: 'zid',
    tag: 'Skincare — custom CSS',
    screenshot: '/projects/orya.png',
    year: '2025',
    link: 'https://orya.world/ar-eg/',
  },
  {
    id: 'uniquescent',
    category: 'css',
    title: 'Unique Scent',
    platform: 'zid',
    tag: 'Premium perfumes — custom CSS',
    screenshot: '/projects/uniquescent.png',
    year: '2025',
    link: 'https://uniquescent.net/',
  },
  {
    id: 'taled',
    category: 'css',
    title: 'Taled',
    platform: 'salla',
    tag: 'Premium prayer beads — custom CSS',
    screenshot: '/projects/taled.png',
    year: '2025',
    link: 'https://taled.net/',
  },
  {
    id: 'rose',
    category: 'sdk',
    title: 'Rose',
    platform: 'zid',
    tag: 'SDK',
    comingSoon: true,
    year: '2026',
  },
  {
    id: 'furniture',
    category: 'sdk',
    title: 'Furniture',
    platform: 'zid',
    tag: 'SDK',
    comingSoon: true,
    year: '2026',
  },
  {
    id: 'athar',
    category: 'theme',
    title: 'Athar',
    themeSlug: 'athar',
    platform: 'zid',
    tag: 'Zid marketplace theme — publishing soon',
    comingSoon: true,
    year: '2026',
  },
  {
    id: 'zayn',
    category: 'theme',
    title: 'Zayn',
    themeSlug: 'zayn',
    platform: 'zid',
    tag: 'Zid marketplace theme — in development, coming soon',
    comingSoon: true,
    year: '2026',
  },
];

export function filterStoreProjects(
  platform: 'zid' | 'salla',
  workFilter: StoreWorkFilter
): StoreProject[] {
  return storeProjects.filter((project) => {
    if (project.platform !== platform) return false;
    if (workFilter === 'all') return true;
    if (workFilter === 'css') return project.category === 'css';
    if (workFilter === 'sdk') {
      return project.category === 'sdk' || project.category === 'theme';
    }
    return true;
  });
}

export function getStoreProject(id: string) {
  return storeProjects.find((p) => p.id === id);
}

import type { LocalizedString } from '@/lib/localized';

export type ComparisonViewport = {
  beforeImage?: string;
  afterImage?: string;
};

export type ProjectComparison = {
  id: string;
  title?: LocalizedString;
  description?: LocalizedString;
  /** مقارنة واحدة — للمشاريع البسيطة */
  beforeImage?: string;
  afterImage?: string;
  /** مقارنة منفصلة لكل شاشة */
  desktop?: ComparisonViewport;
  mobile?: ComparisonViewport;
};

export type ProjectDetail = {
  projectId: string;
  featured?: boolean;
  summary: LocalizedString;
  scope?: LocalizedString;
  improvements: LocalizedString[];
  /** مقارنة واحدة — للتوافق مع المشاريع القديمة */
  beforeImage?: string;
  afterImage?: string;
  /** مقارنات متعددة — كل تعديل بعنوان وصوره */
  comparisons?: ProjectComparison[];
  /** وصف مخصص لسكشن المقارنات (مشاريع فيها أجزاء كتير) */
  compareIntro?: LocalizedString;
};

export function getProjectComparisons(detail: ProjectDetail): ProjectComparison[] {
  if (detail.comparisons?.length) return detail.comparisons;
  if (detail.afterImage) {
    return [
      {
        id: 'main',
        afterImage: detail.afterImage,
        beforeImage: detail.beforeImage,
      },
    ];
  }
  return [];
}

export type ComparisonViewportRow = {
  id: 'single' | 'desktop' | 'mobile';
  beforeImage?: string;
  afterImage?: string;
};

export function getComparisonViewports(comparison: ProjectComparison): ComparisonViewportRow[] {
  if (comparison.desktop || comparison.mobile) {
    const rows: ComparisonViewportRow[] = [];
    if (comparison.desktop?.beforeImage || comparison.desktop?.afterImage) {
      rows.push({ id: 'desktop', ...comparison.desktop });
    }
    if (comparison.mobile?.beforeImage || comparison.mobile?.afterImage) {
      rows.push({ id: 'mobile', ...comparison.mobile });
    }
    return rows;
  }

  if (comparison.beforeImage || comparison.afterImage) {
    return [
      {
        id: 'single',
        beforeImage: comparison.beforeImage,
        afterImage: comparison.afterImage,
      },
    ];
  }

  return [];
}

export function hasComparisonContent(comparison: ProjectComparison): boolean {
  return getComparisonViewports(comparison).some((row) => row.beforeImage || row.afterImage);
}

export function comparisonHasBeforeImage(comparison: ProjectComparison): boolean {
  return getComparisonViewports(comparison).some((row) => Boolean(row.beforeImage));
}

export type FinalStoreShowcase = {
  id: string;
  image: string;
  title?: LocalizedString;
};

export function getBeforeAfterComparisons(detail: ProjectDetail): ProjectComparison[] {
  return getProjectComparisons(detail).filter(
    (comparison) => hasComparisonContent(comparison) && comparisonHasBeforeImage(comparison)
  );
}

export function getFinalStoreShowcases(detail: ProjectDetail): FinalStoreShowcase[] {
  const showcases: FinalStoreShowcase[] = [];

  for (const comparison of getProjectComparisons(detail)) {
    if (comparisonHasBeforeImage(comparison)) continue;

    const viewports = getComparisonViewports(comparison).filter((row) => row.afterImage);
    if (!viewports.length) continue;

    if (viewports.length === 1 && viewports[0].id === 'single') {
      showcases.push({
        id: comparison.id,
        image: viewports[0].afterImage!,
        title: comparison.title,
      });
      continue;
    }

    for (const viewport of viewports) {
      showcases.push({
        id: `${comparison.id}-${viewport.id}`,
        image: viewport.afterImage!,
        title: comparison.title,
      });
    }
  }

  return showcases;
}

export const projectDetails: ProjectDetail[] = [
  {
    projectId: 'orya',
    featured: true,
    summary: {
      ar: 'تخصيص CSS على ثيم زد لمتجر عناية بالبشرة — تحسين الهيدر، الهيرو، وعرض المنتجات مع هوية أوضح وأسلوب أقرب للبراند.',
      en: 'Custom CSS on a Zid theme for a skincare store — header, hero, and product layout refined for a clearer brand feel.',
    },
    improvements: [
      { ar: 'هيدر وقائمة تنقل أوضح', en: 'Clearer header & navigation' },
      { ar: 'سكشن الهيرو والعناوين', en: 'Hero section & typography' },
      { ar: 'كروت المنتجات والمسافات', en: 'Product cards & spacing' },
      { ar: 'ألوان ولمسات بصرية للبراند', en: 'Brand colors & visual polish' },
      { ar: 'تحسينات عرض على الموبايل', en: 'Mobile layout refinements' },
    ],
    afterImage: '/projects/orya.png',
    beforeImage: '/projects/orya-before.png',
  },
  {
    projectId: 'dafa',
    summary: {
      ar: 'تخصيص واجهة متجر دافا على زد — تنظيم السكاشن، البانرات، وشبكة المنتجات لمتجر مستلزمات منزلية كبير.',
      en: 'Storefront CSS for Dafa on Zid — sections, banners, and product grid tuned for a large home-care catalog.',
    },
    improvements: [
      { ar: 'الصفحة الرئيسية والبانرات', en: 'Homepage & promo banners' },
      { ar: 'شبكة المنتجات والتصنيفات', en: 'Product grid & categories' },
      { ar: 'تنسيق الألوان والخطوط', en: 'Color & type consistency' },
      { ar: 'مسافات وتجربة تصفح أوضح', en: 'Spacing & clearer browsing' },
    ],
    afterImage: '/projects/dafa.png',
  },
  {
    projectId: 'taln',
    summary: {
      ar: 'تخصيص CSS لمتجر تالن على سلة — صفحة خدمات LinkedIn والسيرة الذاتية بهوية احترافية ومسارات أوضح للعميل.',
      en: 'Custom CSS for Taln on Salla — LinkedIn & CV service pages with a professional layout and clearer user flow.',
    },
    improvements: [
      { ar: 'هيرو ورسائل الخدمة', en: 'Service hero & messaging' },
      { ar: 'سكاشن الخدمات المتعددة', en: 'Multi-service sections' },
      { ar: 'آراء العملاء والثقة', en: 'Testimonials & trust blocks' },
      { ar: 'تنسيق الموبايل', en: 'Mobile polish' },
    ],
    afterImage: '/projects/taln.png',
    beforeImage: '/projects/taln-before.png',
  },
  {
    projectId: 'royalmarina',
    summary: {
      ar: 'تخصيص واجهة رويال مارينا على زد — أسلوب بحري فاخر، سكاشن الرحلات، وCTA للحجز بشكل أوضح.',
      en: 'Royal Marina CSS on Zid — premium nautical styling, trip sections, and clearer booking CTAs.',
    },
    improvements: [
      { ar: 'هيرو بصري قوي', en: 'Strong visual hero' },
      { ar: 'سكاشن الرحلات والوجهات', en: 'Trip & destination sections' },
      { ar: 'أزرار الحجز والمسارات', en: 'Booking CTAs & flow' },
      { ar: 'تناسق الألوان البحرية', en: 'Nautical color system' },
    ],
    afterImage: '/projects/royalmarina.png',
  },
  {
    projectId: 'bahiah',
    summary: {
      ar: 'تخصيص CSS لمتجر باهية — واجهة أزياء وعبايات أنيقة مع تركيز على الصور والمساحات البيضاء.',
      en: 'Bahiah CSS — elegant abaya storefront with focus on imagery and whitespace.',
    },
    improvements: [
      { ar: 'هيدر وهوية العلامة', en: 'Header & brand presence' },
      { ar: 'شبكة المنتجات', en: 'Product grid layout' },
      { ar: 'بانرات المجموعات', en: 'Collection banners' },
      { ar: 'لمسات typographic فاخرة', en: 'Premium typography touches' },
    ],
    afterImage: '/projects/bahiah.png',
  },
  {
    projectId: 'vlon',
    summary: {
      ar: 'تحسينات CSS خفيفة على متجر فلون — ضبط المسافات، الألوان، وعرض المنتجات على الموبايل.',
      en: 'Light CSS refinements for Vlon — spacing, colors, and mobile product display.',
    },
    improvements: [
      { ar: 'تنسيق الهوم على الموبايل', en: 'Mobile homepage layout' },
      { ar: 'كروت المنتجات', en: 'Product cards' },
      { ar: 'ألوان وخلفيات متناسقة', en: 'Consistent colors & backgrounds' },
    ],
    afterImage: '/projects/vlon.png',
  },
  {
    projectId: 'taled',
    summary: {
      ar: 'تخصيص CSS لمتجر تالد للسبح على سلة — تايمر في الكارد وصفحة المنتج، أيقونات المفضلة والمعاينة على الصورة، لافتة الإهداء، توسيط المحتوى، خط مخصص، وصورة تلقائية مع المنتجات.',
      en: 'Custom CSS for Taled prayer-bead store on Salla — timers on cards & product page, wishlist/preview icons on images, gift banner, centered content, custom typography, and auto product imagery.',
    },
    compareIntro: {
      ar: 'كل تعديل له مقارنة مستقلة — لقطات قبل وبعد لكل جزء تُضاف قريباً.',
      en: 'Each change gets its own before/after — section shots coming soon.',
    },
    improvements: [
      { ar: 'تايمر عدّ تنازلي في كارد المنتج', en: 'Countdown timer on product cards' },
      { ar: 'نقل أيقون القلب والمعاينة للصورة مع تصغير أنسب', en: 'Wishlist & quick-view icons on the image, resized' },
      { ar: 'تايمر بلون مميز في صفحة تفاصيل المنتج', en: 'Distinctive-colored timer on the product page' },
      { ar: 'لافتة الإهداء تحت التايمر بلون مميز', en: 'Gift banner below the timer with brand color' },
      { ar: 'العنوان والسعر والوصف في المنتصف', en: 'Centered title, price & description' },
      { ar: 'خط مخصص غير متوفر في الثيم', en: 'Custom font not available in the base theme' },
      { ar: 'صورة تلقائية تظهر مع كل المنتجات', en: 'Automatic image shown across product listings' },
    ],
    comparisons: [
      {
        id: 'product-card',
        title: { ar: 'كارد المنتج', en: 'Product card' },
        description: {
          ar: 'تايمر العرض + أيقون القلب والمعاينة على الصورة.',
          en: 'Promo timer plus wishlist & preview icons on the product image.',
        },
      },
      {
        id: 'product-page',
        title: { ar: 'صفحة تفاصيل المنتج', en: 'Product detail page' },
        description: {
          ar: 'تايمر ملوّن، لافتة الإهداء، وتوسيط العنوان والسعر والوصف.',
          en: 'Colored timer, gift banner, and centered title/price/description.',
        },
      },
      {
        id: 'product-image',
        title: { ar: 'صورة المنتج التلقائية', en: 'Automatic product image' },
        description: {
          ar: 'صورة تُعرض تلقائياً مع المنتجات في القوائم.',
          en: 'Image applied automatically across product grids.',
        },
      },
    ],
  },
  {
    projectId: 'uniquescent',
    summary: {
      ar: 'تخصيص CSS لمتجر يونيك سنت للعطور على زد — تايمرات عروض، صفحة منتج بمحتوى في المنتصف، آراء عملاء محسّنة، خط مخصص، وتحسين تابي وتمارا والمنتج المميز.',
      en: 'Custom CSS for Unique Scent perfume store on Zid — promo timers, centered product page content, refined reviews, custom typography, and improved Tabby, Tamara & featured product blocks.',
    },
    compareIntro: {
      ar: 'كل تعديل له مقارنة مستقلة — لقطة قبل وبعد للجزء ده بس على ديسكتوب وموبايل، عشان الفرق يبان حتى لو بسيط.',
      en: 'Each change gets its own before/after — cropped to that area on desktop and mobile, so even small differences are clear.',
    },
    improvements: [
      { ar: 'تايمر عدّ تنازلي في كارد المنتج', en: 'Countdown timer on product cards' },
      { ar: 'تايمر في صفحة تفاصيل المنتج', en: 'Timer on the product detail page' },
      { ar: 'العنوان والسعر والوصف في المنتصف', en: 'Centered title, price & description' },
      { ar: 'تحسين شكل آراء العملاء وتوسيطها', en: 'Redesigned & centered customer reviews' },
      { ar: 'خط مخصص غير متوفر في الثيم', en: 'Custom font not available in the base theme' },
      { ar: 'تحسين شكل تابي وتمارا', en: 'Polished Tabby & Tamara widgets' },
      { ar: 'تحسين عرض المنتج المميز', en: 'Improved featured product section' },
    ],
    comparisons: [
      {
        id: 'product-card-timer',
        title: { ar: 'تايمر في كارد المنتج', en: 'Product card timer' },
        description: {
          ar: 'عداد تنازلي داخل كارد المنتج — قبل ما يكون موجود، وبعد ما اتضاف.',
          en: 'Countdown timer on the product card — before it existed, and after it was added.',
        },
        desktop: {
          beforeImage: '/projects/uniquescent/card-before-desktop.png',
          afterImage: '/projects/uniquescent/card-after-desktop.png',
        },
        mobile: {
          beforeImage: '/projects/uniquescent/card-before-mobile.png',
          afterImage: '/projects/uniquescent/card-after-mobile.png',
        },
      },
      {
        id: 'product-page',
        title: { ar: 'صفحة تفاصيل المنتج', en: 'Product detail page' },
        description: {
          ar: 'تايمر + توسيط العنوان والسعر والوصف + تحسين شكل تابي وتمارا.',
          en: 'Timer, centered title/price/description, and polished Tabby & Tamara widgets.',
        },
        desktop: {
          beforeImage: '/projects/uniquescent/detail-before-desktop.png',
          afterImage: '/projects/uniquescent/detail-after-desktop.png',
        },
        mobile: {
          beforeImage: '/projects/uniquescent/detail-before-mobile.png',
          afterImage: '/projects/uniquescent/detail-after-mobile.png',
        },
      },
      {
        id: 'reviews',
        title: { ar: 'آراء العملاء', en: 'Customer reviews' },
        description: {
          ar: 'شكل أوضح مع توسيط النص لراحة العين.',
          en: 'Clearer layout with centered review text.',
        },
        mobile: {
          beforeImage: '/projects/uniquescent/reviews-before-mobile.png',
          afterImage: '/projects/uniquescent/reviews-after-mobile.png',
        },
      },
    ],
  },
];

export function getProjectDetail(id: string) {
  return projectDetails.find((d) => d.projectId === id);
}

export function getFeaturedDetail() {
  return projectDetails.find((d) => d.featured) ?? projectDetails[0];
}

export function hasProjectDetail(id: string) {
  return projectDetails.some((d) => d.projectId === id);
}

export const getStoreProjectDetail = getProjectDetail;
export const hasStoreProjectDetail = hasProjectDetail;
export { projectDetails as storeProjectDetails };

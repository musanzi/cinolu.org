import { LucideIconData, Lightbulb, Rocket } from 'lucide-angular';

export interface IHeroSlideBase {
  id: number;
  badge: {
    icon: LucideIconData;
  };
  backgroundImage: string;
  primaryCta: {
    link: string;
  };
  secondaryCta?: {
    link: string;
    external?: boolean;
  };
}

export interface IHeroSlide extends IHeroSlideBase {
  badge: {
    icon: LucideIconData;
    text?: string;
    textKey?: string;
  };
  title?: string;
  titleKey?: string;
  titleHighlight?: string;
  titleHighlightKey?: string;
  description?: string;
  descriptionKey?: string;
  primaryCta: {
    text?: string;
    textKey?: string;
    link: string;
  };
  secondaryCta?: {
    text?: string;
    textKey?: string;
    link: string;
    external?: boolean;
  };
}

export interface IHeroSlideStatic extends IHeroSlideBase {
  badge: {
    icon: LucideIconData;
    textKey: string;
  };
  titleKey: string;
  titleHighlightKey: string;
  descriptionKey: string;
  primaryCta: {
    textKey: string;
    link: string;
  };
  secondaryCta?: {
    textKey: string;
    link: string;
    external?: boolean;
  };
}

export const HERO_SLIDES: IHeroSlideStatic[] = [
  {
    id: 2,
    badge: {
      icon: Lightbulb,
      textKey: 'hero.slides.slide_2.badge_text'
    },
    titleKey: 'hero.slides.slide_2.title',
    titleHighlightKey: 'hero.slides.slide_2.title_highlight',
    descriptionKey: 'hero.slides.slide_2.description',
    backgroundImage: '/images/hero.jpg',
    primaryCta: {
      textKey: 'hero.slides.slide_2.primary_cta',
      link: '/sign-up'
    },
    secondaryCta: {
      textKey: 'hero.slides.slide_2.secondary_cta',
      link: 'https://www.every.org/centre-dinnovation-lubumbashi-asbl?utm_campaign=donate-link#/donate',
      external: true
    }
  },
  {
    id: 3,
    badge: {
      icon: Rocket,
      textKey: 'hero.slides.slide_3.badge_text'
    },
    titleKey: 'hero.slides.slide_3.title',
    titleHighlightKey: 'hero.slides.slide_3.title_highlight',
    descriptionKey: 'hero.slides.slide_3.description',
    backgroundImage: '/images/innovation.jpg',
    primaryCta: {
      textKey: 'hero.slides.slide_3.primary_cta',
      link: '/programs'
    },
    secondaryCta: {
      textKey: 'hero.slides.slide_3.secondary_cta',
      link: '/events'
    }
  }
];

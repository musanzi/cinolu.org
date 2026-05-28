import { SeoRouteData } from './seo.types';

export const SEO_BRAND = 'CINOLU';
export const SEO_HOME_TITLE = `${SEO_BRAND} - Centre d'Innovation de Lubumbashi`;
export const SEO_DEFAULT_DESCRIPTION =
  "CINOLU, le Centre d'Innovation de Lubumbashi, accompagne entrepreneurs, startups et innovateurs à travers programmes, événements et opportunités.";
export const SEO_DEFAULT_KEYWORDS =
  "CINOLU, Centre d'innovation de Lubumbashi, innovation, entrepreneuriat, startup, Lubumbashi, RDC, incubateur";
export const SEO_OG_IMAGE = 'https://cinolu.org/images/about.jpg';

export const SEO_PUBLIC = {
  home: {
    isHome: true,
    description:
      "Hub d'innovation à Lubumbashi : programmes d'accompagnement, événements, opportunités et écosystème entrepreneurial au CINOLU.",
    keywords: SEO_DEFAULT_KEYWORDS
  },
  events: {
    description:
      "Découvrez les événements du CINOLU à Lubumbashi : ateliers, conférences, hackathons et rencontres de l'écosystème innovation.",
    keywords: 'événements CINOLU, innovation Lubumbashi, hackathon, conférence entrepreneuriat'
  },
  eventDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION
  },
  programs: {
    description:
      'Explorez les programmes et appels à projets du CINOLU pour transformer vos idées en solutions concrètes à Lubumbashi.',
    keywords: 'programmes CINOLU, appel à projets, innovation, accompagnement startup'
  },
  programDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION
  },
  ourPrograms: {
    description:
      "Parcourez les programmes d'accompagnement du CINOLU : incubation, accélération et formations pour entrepreneurs.",
    keywords: 'programmes incubation, accélération, formation entrepreneur CINOLU'
  },
  opportunities: {
    description:
      'Consultez les opportunités publiées par le CINOLU : financements, concours, partenariats et appels à candidatures.',
    keywords: 'opportunités CINOLU, financement startup, appel à candidatures Lubumbashi'
  },
  opportunityDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION
  },
  ambassadors: {
    description:
      'Rencontrez les ambassadeurs CINOLU qui portent l’innovation et l’entrepreneuriat à Lubumbashi et dans la région.',
    keywords: 'ambassadeurs CINOLU, communauté innovation, entrepreneurs Lubumbashi'
  },
  ambassadorDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION,
    robots: 'noindex, follow'
  },
  about: {
    description:
      "Découvrez la mission, la vision et l'impact du CINOLU, Centre d'Innovation de Lubumbashi au service des entrepreneurs.",
    keywords: 'à propos CINOLU, mission, vision, innovation Lubumbashi'
  },
  entrepreneurs: {
    description:
      'Découvrez les entrepreneurs et ventures accompagnés par le CINOLU à Lubumbashi.',
    keywords: 'entrepreneurs CINOLU, startups Lubumbashi, écosystème innovation'
  },
  entrepreneurDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION
  },
  productDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION
  },
  gallery: {
    description:
      'Parcourez la galerie photo et vidéo du CINOLU : moments forts, événements et vie de la communauté innovation.',
    keywords: 'galerie CINOLU, photos événements, communauté innovation'
  },
  contact: {
    description:
      'Contactez le CINOLU à Lubumbashi pour vos questions, partenariats ou candidatures aux programmes.',
    keywords: 'contact CINOLU, Lubumbashi, centre innovation'
  },
  faq: {
    description:
      'Questions fréquentes sur le CINOLU, ses programmes, événements et modalités d’accompagnement à Lubumbashi.',
    keywords: 'FAQ CINOLU, questions programmes, accompagnement startup'
  },
  blog: {
    description:
      'Articles, ressources et actualités du CINOLU sur l’innovation, l’entrepreneuriat et l’écosystème à Lubumbashi.',
    keywords: 'blog CINOLU, ressources innovation, actualités entrepreneuriat'
  },
  articleDetail: {
    dynamic: true,
    description: SEO_DEFAULT_DESCRIPTION,
    type: 'article'
  },
  partners: {
    description:
      'Découvrez les partenaires du CINOLU et rejoignez un réseau engagé pour l’innovation et l’entrepreneuriat à Lubumbashi.',
    keywords: 'partenaires CINOLU, collaboration innovation, réseau Lubumbashi'
  },
  auth: {
    robots: 'noindex, nofollow',
    description: SEO_DEFAULT_DESCRIPTION
  },
  dashboard: {
    robots: 'noindex, nofollow',
    description: SEO_DEFAULT_DESCRIPTION
  },
  notFound: {
    robots: 'noindex, follow',
    description: 'La page demandée est introuvable sur le site officiel du CINOLU.'
  }
} as const satisfies Record<string, SeoRouteData>;

export const ORGANIZATION_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CINOLU',
  alternateName: "Centre d'Innovation de Lubumbashi",
  url: 'https://cinolu.org/',
  logo: 'https://cinolu.org/images/logo/logo-w.png',
  description: SEO_DEFAULT_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lubumbashi',
    addressCountry: 'CD'
  },
  sameAs: [
    'https://www.facebook.com/share/15cR36qNs8/',
    'https://x.com/Lubumdigital',
    'https://www.linkedin.com/company/cinolu/'
  ]
};

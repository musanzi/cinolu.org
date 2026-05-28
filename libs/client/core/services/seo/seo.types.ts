export type SeoRobots = 'index, follow' | 'noindex, nofollow' | 'noindex, follow';

export interface SeoRouteData {
  description?: string;
  keywords?: string;
  robots?: SeoRobots;
  /** When true, document title is the home title without a page suffix. */
  isHome?: boolean;
  /** Skip automatic meta updates (dynamic detail pages set meta themselves). */
  dynamic?: boolean;
  image?: string;
  type?: 'website' | 'article' | 'event';
}

export interface SeoUpdateOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'event';
  robots?: SeoRobots;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import {
  ORGANIZATION_JSON_LD,
  SEO_BRAND,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_KEYWORDS,
  SEO_HOME_TITLE,
  SEO_OG_IMAGE
} from './seo.constants';
import { SeoRouteData, SeoUpdateOptions } from './seo.types';

@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #document = inject(DOCUMENT);

  buildDocumentTitle(pageTitle: string | undefined, seo?: SeoRouteData): string {
    if (seo?.isHome || !pageTitle) {
      return SEO_HOME_TITLE;
    }
    return `${SEO_BRAND} - ${pageTitle}`;
  }

  applyFromRoute(routerState: RouterStateSnapshot, pageTitle: string | undefined): void {
    const route = this.#deepestRoute(routerState.root);
    const seo = this.#routeSeoData(route);

    if (seo?.dynamic) {
      return;
    }

    const documentTitle = this.buildDocumentTitle(pageTitle, seo);
    this.#title.setTitle(documentTitle);

    this.update({
      title: documentTitle,
      description: seo?.description ?? SEO_DEFAULT_DESCRIPTION,
      path: this.#pathFromUrl(routerState.url),
      image: seo?.image,
      type: seo?.type ?? 'website',
      robots: seo?.robots ?? 'index, follow',
      keywords: seo?.keywords ?? SEO_DEFAULT_KEYWORDS,
      jsonLd: seo?.isHome ? ORGANIZATION_JSON_LD : undefined
    });
  }

  update(options: SeoUpdateOptions): void {
    const description = this.#truncate(options.description ?? SEO_DEFAULT_DESCRIPTION, 160);
    const canonicalUrl = this.#canonicalUrl(options.path);
    const image = options.image ?? SEO_OG_IMAGE;

    this.#title.setTitle(options.title);

    this.#setMeta('name', 'description', description);
    this.#setMeta('name', 'robots', options.robots ?? 'index, follow');

    if (options.keywords) {
      this.#setMeta('name', 'keywords', options.keywords);
    }

    this.#setLink('canonical', canonicalUrl);

    this.#setMeta('property', 'og:title', options.title);
    this.#setMeta('property', 'og:description', description);
    this.#setMeta('property', 'og:url', canonicalUrl);
    this.#setMeta('property', 'og:type', options.type ?? 'website');
    this.#setMeta('property', 'og:site_name', SEO_BRAND);
    this.#setMeta('property', 'og:locale', 'fr_FR');
    this.#setMeta('property', 'og:image', image);

    this.#setMeta('name', 'twitter:card', 'summary_large_image');
    this.#setMeta('name', 'twitter:title', options.title);
    this.#setMeta('name', 'twitter:description', description);
    this.#setMeta('name', 'twitter:image', image);

    if (options.jsonLd) {
      this.#setJsonLd(options.jsonLd);
    } else if (!options.path || options.path === '/') {
      this.#setJsonLd(ORGANIZATION_JSON_LD);
    } else {
      this.#removeJsonLd();
    }
  }

  updateDynamic(options: SeoUpdateOptions): void {
    this.update(options);
  }

  updateEntityPage(params: {
    name: string;
    description?: string | null;
    path: string;
    type?: SeoUpdateOptions['type'];
    image?: string;
  }): void {
    this.updateDynamic({
      title: `${SEO_BRAND} - ${params.name}`,
      description: params.description ?? SEO_DEFAULT_DESCRIPTION,
      path: params.path,
      type: params.type ?? 'website',
      image: params.image
    });
  }

  #deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  #routeSeoData(route: ActivatedRouteSnapshot): SeoRouteData | undefined {
    let current: ActivatedRouteSnapshot | null = route;
    while (current) {
      const seo = current.data['seo'] as SeoRouteData | undefined;
      if (seo) {
        return seo;
      }
      current = current.parent;
    }
    return undefined;
  }

  #pathFromUrl(url: string): string {
    const path = url.split('?')[0].split('#')[0];
    return path || '/';
  }

  #canonicalUrl(path?: string): string {
    const base = environment.appUrl.replace(/\/$/, '');
    const normalizedPath = (path ?? '/').startsWith('/') ? path : `/${path}`;
    if (normalizedPath === '/') {
      return `${base}/`;
    }
    return `${base}${normalizedPath}`;
  }

  #setMeta(attr: 'name' | 'property', selector: string, content: string): void {
    const key = attr === 'name' ? 'name' : 'property';
    if (this.#meta.getTag(`${key}="${selector}"`)) {
      this.#meta.updateTag({ [key]: selector, content });
    } else {
      this.#meta.addTag({ [key]: selector, content });
    }
  }

  #setLink(rel: string, href: string): void {
    const head = this.#document.head;
    let link = head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', rel);
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  #setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
    const head = this.#document.head;
    let script = head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (!script) {
      script = this.#document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  #removeJsonLd(): void {
    this.#document.head.querySelector('script[data-seo-jsonld]')?.remove();
  }

  #truncate(text: string, maxLength: number): string {
    const plain = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (plain.length <= maxLength) {
      return plain;
    }
    return `${plain.slice(0, maxLength - 1).trim()}…`;
  }
}

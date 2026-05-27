import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const entrepreneursRoutes: Routes = [
  {
    path: '',
    title: 'Entrepreneurs',
    data: { seo: SEO_PUBLIC.entrepreneurs },
    loadComponent: () => import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs)
  },
  {
    path: ':slug',
    title: 'Entrepreneur',
    data: { seo: SEO_PUBLIC.entrepreneurDetail, topbarFixed: true },
    loadComponent: () =>
      import('./components/entrepreneur-detail-card/entrepreneur-detail-card').then((c) => c.EntrepreneurDetailCard)
  },
  {
    path: 'venture/:slug/:slug',
    title: 'Produit',
    data: { seo: SEO_PUBLIC.productDetail, topbarFixed: true },
    loadComponent: () => import('./components/product-detail/product-detail').then((c) => c.ProductDetail)
  }
];

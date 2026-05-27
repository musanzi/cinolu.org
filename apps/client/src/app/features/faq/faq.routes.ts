import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const faqRoutes: Routes = [
  {
    path: '',
    title: 'FAQ',
    data: { seo: SEO_PUBLIC.faq },
    loadComponent: () => import('./pages/faq-page').then((c) => c.FaqPage)
  }
];

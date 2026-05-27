import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const aboutRoutes: Routes = [
  {
    path: '',
    title: 'À propos',
    data: { seo: SEO_PUBLIC.about },
    loadComponent: () => import('./pages/about-us').then((c) => c.AboutUs)
  }
];

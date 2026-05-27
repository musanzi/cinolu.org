import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Accueil',
    data: { seo: SEO_PUBLIC.home },
    loadComponent: () => import('./pages/landing').then((c) => c.Landing)
  }
];

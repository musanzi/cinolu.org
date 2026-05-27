import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const partnersRoutes: Routes = [
  {
    path: '',
    title: 'Partenaires',
    data: { seo: SEO_PUBLIC.partners },
    loadComponent: () => import('./pages/partners').then((c) => c.Partners)
  }
];

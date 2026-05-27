import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const galleryRoutes: Routes = [
  {
    path: '',
    title: 'Galerie',
    data: { seo: SEO_PUBLIC.gallery },
    loadComponent: () => import('./pages/gallery').then((c) => c.Gallery)
  }
];

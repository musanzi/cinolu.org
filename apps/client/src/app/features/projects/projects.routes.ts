import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const projectsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Programme',
    data: { seo: SEO_PUBLIC.programDetail },
    loadComponent: () => import('./pages/detail-project/detail-project').then((c) => c.DetailProject)
  },
  {
    path: '',
    title: 'Appels à projets',
    data: { seo: SEO_PUBLIC.programs },
    loadComponent: () => import('./pages/list-projects/list-projects').then((c) => c.ListProjects)
  }
];

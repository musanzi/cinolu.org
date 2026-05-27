import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const opportunitiesRoutes: Routes = [
  {
    path: '',
    title: 'Opportunités',
    data: { seo: SEO_PUBLIC.opportunities },
    loadComponent: () => import('./pages/list-opportunities/list-opportunities').then((c) => c.ListOpportunities)
  },
  {
    path: ':slug',
    title: 'Opportunité',
    data: { seo: SEO_PUBLIC.opportunityDetail },
    loadComponent: () => import('./pages/detail-opportunity/detail-opportunity').then((c) => c.DetailOpportunity)
  }
];

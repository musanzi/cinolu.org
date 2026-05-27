import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const eventsRoutes: Routes = [
  {
    path: '',
    title: 'Événements',
    data: { seo: SEO_PUBLIC.events },
    loadComponent: () => import('./pages/list-events/list-events').then((c) => c.ListEvents)
  },
  {
    path: ':slug',
    title: 'Événement',
    data: { seo: SEO_PUBLIC.eventDetail },
    loadComponent: () => import('./pages/detail-event/detail-event').then((c) => c.DetailEvent)
  }
];

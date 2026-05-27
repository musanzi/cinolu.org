import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const ambassadorsRoutes: Routes = [
  {
    path: '',
    title: 'Ambassadeurs',
    data: { seo: SEO_PUBLIC.ambassadors },
    loadComponent: () => import('./pages/list-ambassadors/list-ambassadors').then((c) => c.ListAmbassadors)
  },
  {
    path: ':email',
    title: 'Ambassadeur',
    data: { seo: SEO_PUBLIC.ambassadorDetail },
    loadComponent: () => import('./pages/detail-ambassador/detail-ambassador').then((c) => c.DetailAmbassador)
  }
];

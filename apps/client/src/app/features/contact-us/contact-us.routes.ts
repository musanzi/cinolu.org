import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const contactUsRoutes: Routes = [
  {
    path: '',
    title: 'Contact',
    data: { seo: SEO_PUBLIC.contact },
    loadComponent: () => import('./pages/contact-us').then((c) => c.ContactUs)
  }
];

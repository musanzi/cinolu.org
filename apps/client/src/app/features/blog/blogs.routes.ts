import { Routes } from '@angular/router';
import { SEO_PUBLIC } from '@core/services/seo';

export const blogsRoutes: Routes = [
  {
    path: '',
    title: 'Blog & ressources',
    data: { seo: SEO_PUBLIC.blog },
    loadComponent: () => import('./pages/list-articles/list-articles').then((c) => c.ListArticles)
  },
  {
    path: ':slug',
    title: 'Article',
    data: { seo: SEO_PUBLIC.articleDetail, topbarFixed: true },
    loadComponent: () => import('./pages/detail-article/detail-article').then((c) => c.DetailArticle)
  }
];

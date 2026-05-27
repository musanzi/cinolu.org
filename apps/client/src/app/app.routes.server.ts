import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dashboard routes - Client-side only (authenticated)
  {
    path: 'dashboard/**',
    renderMode: RenderMode.Client
  },

  // Auth routes - Client-side only
  {
    path: 'sign-in',
    renderMode: RenderMode.Client
  },
  {
    path: 'sign-up',
    renderMode: RenderMode.Client
  },
  {
    path: 'forgot-password',
    renderMode: RenderMode.Client
  },
  {
    path: 'reset-password',
    renderMode: RenderMode.Client
  },

  // Dynamic pages - Client-side rendering
  {
    path: 'ambassadors/:email',
    renderMode: RenderMode.Client
  },
  {
    path: 'programs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'events/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'blog-ressources/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'opportunities/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'our-programs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'our-programs/:slug/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/venture/:slug/:slug',
    renderMode: RenderMode.Client
  },

  // All other routes - Server-side rendering
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

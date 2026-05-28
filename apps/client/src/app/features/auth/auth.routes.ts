import { Routes } from '@angular/router';
import { unauthGuard } from '@core/guards/no-auth.guard';
import { SEO_PUBLIC } from '@core/services/seo';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    title: 'Connexion',
    data: { seo: SEO_PUBLIC.auth },
    canActivate: [unauthGuard],
    loadComponent: () => import('./pages/sign-in/sign-in').then((c) => c.SignIn)
  },
  {
    path: 'sign-up',
    title: 'Inscription',
    data: { seo: SEO_PUBLIC.auth },
    loadComponent: () => import('./pages/sign-up/sign-up').then((c) => c.SignUp)
  },
  {
    path: 'forgot-password',
    title: 'Mot de passe oublié',
    data: { seo: SEO_PUBLIC.auth },
    loadComponent: () => import('./pages/forgot-password/forgot-password').then((c) => c.ForgotPassword)
  },
  {
    path: 'reset-password',
    title: 'Réinitialiser le mot de passe',
    data: { seo: SEO_PUBLIC.auth },
    loadComponent: () => import('./pages/reset-password/reset-password').then((c) => c.ResetPassword)
  }
];

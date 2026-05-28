import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { RightsService } from '../auth/rights.service';

/**
 * Utilisé sur /dashboard/user/mentor/apply.
 * Redirige vers /dashboard/mentor si l'utilisateur a déjà une candidature approuvée.
 */
export const mentorApplyGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const rightsService = inject(RightsService);
  const router = inject(Router);

  const user = authStore.user();
  if (!user) return true; // authGuard gère l’absence d’utilisateur

  if (rightsService.canAccessMentorArea(user)) {
    router.navigate(['/dashboard/mentor']);
    return false;
  }

  return true;
};

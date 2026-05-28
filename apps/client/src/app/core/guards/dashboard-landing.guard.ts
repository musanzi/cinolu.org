import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { RightsService } from '../auth/rights.service';

/**
 * Redirige /dashboard (sans segment enfant) vers la landing selon le rôle :
 * - Mentor approuvé → /dashboard/mentor
 * - Mentor pending/rejected → /dashboard/user/mentor/application-*
 * - Sinon → /dashboard/user
 */
export const dashboardLandingGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const rightsService = inject(RightsService);
  const router = inject(Router);

  const user = authStore.user();
  const landing = rightsService.resolveLandingRoute(user);
  router.navigateByUrl(landing);
  return false;
};

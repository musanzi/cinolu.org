import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { validateReturnUrl } from '../auth/auth-redirect.util';
import { AuthStore } from '../auth/auth.store';

const LOGIN_PATH = '/sign-in';

export const authGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.user()) {
    const stored = authStore.getRedirectUrl();
    if (stored) {
      authStore.clearRedirectUrl();
      router.navigateByUrl(validateReturnUrl(stored));
      return false;
    }
    return true;
  }

  const pathOnly = state.url.split('?')[0].trim() || '/';
  const returnUrl = pathOnly.startsWith('/') ? pathOnly : '/' + pathOnly;
  router.navigate([LOGIN_PATH], { queryParams: { returnUrl } });
  return false;
};

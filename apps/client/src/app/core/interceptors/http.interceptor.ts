import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthStore } from '../auth/auth.store';
import { validateReturnUrl } from '../auth/auth-redirect.util';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authStore = inject(AuthStore);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (req.url.startsWith('assets/') || req.url.startsWith('/assets/')) {
    return next(req);
  }

  const newReq: HttpRequest<unknown> = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true
  });
  return next(newReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authStore.setUser(null);

        const currentUrl = router.url || '/';
        if (isPlatformBrowser(platformId) && currentUrl.startsWith('/dashboard')) {
          const returnUrl = validateReturnUrl(currentUrl);
          authStore.setRedirectUrl(returnUrl);
          void router.navigate(['/sign-in'], { queryParams: { returnUrl } });
        }
      }

      return throwError(() => error);
    })
  );
};

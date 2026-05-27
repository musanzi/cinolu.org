import {
  EnvironmentProviders,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
  provideEnvironmentInitializer,
  Provider
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IS_DISCOVERING_ROUTES } from '@angular/ssr';
import { LoadingService } from '../services/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { IUser } from '../../shared/models/entities.models';
import { AuthStore } from '../auth/auth.store';
import { AnalyticsService } from '@core/services/analytics';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: Provider | EnvironmentProviders = [
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      const isDiscoveringRoutes = inject(IS_DISCOVERING_ROUTES, { optional: true }) ?? false;
      const analytics = inject(AnalyticsService);
      const authStore = inject(AuthStore);
      const http = inject(HttpClient);

      // Skip all side effects during SSR route discovery or server-side rendering
      if (isDiscoveringRoutes || !isPlatformBrowser(platformId)) {
        authStore.setUser(null);
        return of(null);
      }

      analytics.init();

      return http.get<{ data: IUser }>('auth/me').pipe(
        map(({ data }) => {
          authStore.setUser(data);
        }),
        catchError(() => {
          authStore.setUser(null);
          return of(null);
        })
      );
    })
  ];
  return providers;
};

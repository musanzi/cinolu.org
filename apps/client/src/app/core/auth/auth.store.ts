import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { IUser } from '@shared/models/entities.models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../services/toast/toastr.service';
import { isSafeInternalReturnUrl, validateReturnUrl } from './auth-redirect.util';

/** Clé sessionStorage pour l’URL de redirection après login (route protégée demandée). */
export const AUTH_REDIRECT_KEY = 'cinolu.auth.redirectUrl';

interface IAuthStore {
  isLoading: boolean;
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({ user: null, isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _router, _toast, ...store }) => ({
    getProfile: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.get<{ data: IUser }>('auth/me').pipe(
            tap(({ data }) => {
              patchState(store, { user: data });
            }),
            catchError(() => {
              patchState(store, { user: null });
              return of(null);
            })
          )
        )
      )
    ),

    signOut: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.post<void>('auth/signout', {}).pipe(
            tap(() => {
              _router.navigate(['/sign-in']);
              _toast.showSuccess('Déconnexion réussie');
              patchState(store, { user: null });
            }),
            catchError(() => {
              _toast.showError('Erreur lors de la déconnexion');
              return of(null);
            })
          )
        )
      )
    ),
    setUser: (user: IUser | null) => patchState(store, { user }),

    /** Enregistre l’URL cible pour redirection après connexion (sessionStorage). */
    setRedirectUrl: (url: string) => {
      try {
        sessionStorage.setItem(AUTH_REDIRECT_KEY, validateReturnUrl(url));
      } catch {
        // sessionStorage indisponible (SSR, contexte privé)
      }
    },

    /** Récupère l’URL cible enregistrée, ou null si absente / invalide. */
    getRedirectUrl: (): string | null => {
      try {
        const url = sessionStorage.getItem(AUTH_REDIRECT_KEY);
        if (!isSafeInternalReturnUrl(url)) return null;
        return url.trim();
      } catch {
        return null;
      }
    },

    /** Supprime l’URL cible après redirection (évite réutilisation). */
    clearRedirectUrl: () => {
      try {
        sessionStorage.removeItem(AUTH_REDIRECT_KEY);
      } catch {
        // no-op
      }
    }
  }))
);

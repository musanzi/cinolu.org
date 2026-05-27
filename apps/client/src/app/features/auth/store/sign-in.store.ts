import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthStore } from '@core/auth/auth.store';
import { validateReturnUrl } from '@core/auth/auth-redirect.util';

interface ISignInStore {
  isLoading: boolean;
}

interface ISignInParams {
  payload: SignInDto;
  onSuccess: () => void;
  returnUrl?: string;
}

export const SignInStore = signalStore(
  withState<ISignInStore>({
    isLoading: false
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService),
    _authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _router, _toast, _authStore, ...store }) => ({
    signIn: rxMethod<ISignInParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess, returnUrl }) => {
          return _http.post<{ data: IUser }>('auth/signin', payload).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false });
              _authStore.setUser(data);
              _authStore.clearRedirectUrl();
              _toast.showSuccess('Connexion réussie');

              const targetUrl = validateReturnUrl(returnUrl);
              _router.navigateByUrl(targetUrl);
              onSuccess();
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error['message'] || 'Erreur de connexion');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

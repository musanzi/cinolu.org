import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';
import { SignUpDto } from '../dto/sign-up.dto';
import { AuthStore } from '@core/auth/auth.store';
import { validateReturnUrl } from '@core/auth/auth-redirect.util';
import { isProfileIncomplete } from '@core/auth/profile.util';

interface ISignUpStore {
  isLoading: boolean;
  user: IUser | null;
}

interface ISignUpParams {
  payload: SignUpDto;
  returnUrl?: string;
}

export const SignUpStore = signalStore(
  withState<ISignUpStore>({ isLoading: false, user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router),
    _authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _toast, _router, _authStore, ...store }) => ({
    signUp: rxMethod<ISignUpParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, returnUrl }) => {
          return _http.post<{ data: IUser }>('auth/signup', payload).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, user: data });
              _authStore.setUser(data);

              const incomplete = isProfileIncomplete(data);
              if (incomplete) {
                _toast.showSuccess('Inscription réussie. Complétez votre profil pour continuer.');
                _router.navigate(['/dashboard/user/profile'], {
                  queryParams: { completeProfile: '1' }
                });
                return;
              }

              _toast.showSuccess('Connexion réussie');
              _router.navigateByUrl(validateReturnUrl(returnUrl));
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error['message'] || "Erreur d'inscription");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

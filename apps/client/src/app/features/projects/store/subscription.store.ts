import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';

interface FormSubmissionDto {
  formId: string;
  responses: Record<string, unknown>[];
}

interface SubscriptionStoreState {
  isLoading: boolean;
}

export const SubscriptionStore = signalStore(
  withState<SubscriptionStoreState>({
    isLoading: false
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    submitForm: rxMethod<FormSubmissionDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: unknown }>('form-submissions', payload).pipe(
            tap(() => {
              _toast.showSuccess('Formulaire soumis avec succès');
              patchState(store, { isLoading: false });
            }),
            catchError(() => {
              _toast.showError('Erreur lors de la soumission du formulaire');
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

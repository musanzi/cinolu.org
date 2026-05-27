import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../core/services/toast/toastr.service';
import { ContactUsDto } from '../dto/contact-us.dto';

interface IContactUsStore {
  isLoading: boolean;
}

interface ContactUsParams {
  payload: ContactUsDto;
  onSuccess: () => void;
}

export const ContactUsStore = signalStore(
  withState<IContactUsStore>({
    isLoading: false
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    contactUs: rxMethod<ContactUsParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http.post<void>('auth/support/contact', {
          email: payload.email,
          name: payload.name,
          country: payload.country,
          phone_number: payload.phone,
          message: payload.message
        }).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Message envoyé avec succès');
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

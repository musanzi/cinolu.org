import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IUser } from '@shared/models';

interface IAmbassadorStore {
  isLoading: boolean;
  ambassador: IUser | null;
}

export const AmbassadorStore = signalStore(
  withState<IAmbassadorStore>({ isLoading: false, ambassador: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadAmbassador: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((email) => {
          return _http.get<{ data: IUser }>(`users/ambassadors/${email}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, ambassador: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, ambassador: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

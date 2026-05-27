import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IUser } from '../../../shared/models';
import { FilterAmbassadorsDto } from '../dto/filter-ambassadors.dto';
import { buildQueryParams } from '../../../shared/helpers';

interface IAmbassadorsStore {
  isLoading: boolean;
  ambassadors: [IUser[], number];
}

export const AmbassadorsStore = signalStore(
  withState<IAmbassadorsStore>({ isLoading: false, ambassadors: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadAmbassadors: rxMethod<FilterAmbassadorsDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [IUser[], number] }>('users/ambassadors', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, ambassadors: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, ambassadors: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

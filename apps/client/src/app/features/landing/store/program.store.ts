import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IProgram } from '../../../shared/models';

interface IProgramStore {
  isLoading: boolean;
  program: IProgram | null;
}

export const ProgramStore = signalStore(
  withState<IProgramStore>({ isLoading: false, program: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadProgram: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: IProgram }>(`programs/by-slug/${slug}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, program: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

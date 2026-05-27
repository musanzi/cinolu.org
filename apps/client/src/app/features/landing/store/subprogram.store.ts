import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISubprogram } from '../../../shared/models/entities.models';

interface ISubprogramStore {
  isLoading: boolean;
  subprogram: ISubprogram | null;
}

export const SubprogramsStore = signalStore(
  withState<ISubprogramStore>({ isLoading: false, subprogram: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadSubprogram: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: ISubprogram }>(`subprograms/by-slug/${slug}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, subprogram: data });
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

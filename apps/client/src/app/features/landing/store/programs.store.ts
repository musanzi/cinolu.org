import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IProgram } from '../../../shared/models/entities.models';

interface IProgramsStore {
  isLoading: boolean;
  programs: IProgram[];
}

export const ProgramsStore = signalStore(
  withState<IProgramsStore>({ isLoading: false, programs: [] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadPrograms: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IProgram[] }>('programs').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, programs: data })),
            catchError(() => {
              patchState(store, { isLoading: false, programs: [] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

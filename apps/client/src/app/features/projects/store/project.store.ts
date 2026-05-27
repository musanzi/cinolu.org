import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IProject } from '../../../shared/models/entities.models';

interface IProjectStore {
  isLoading: boolean;
  project: IProject | null;
}

export const ProjectStore = signalStore(
  withState<IProjectStore>({ isLoading: false, project: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, project: null })),
        switchMap((slug) => {
          return _http.get<{ data: IProject }>(`projects/by-slug/${slug}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, project: data })),
            catchError(() => {
              patchState(store, { isLoading: false, project: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

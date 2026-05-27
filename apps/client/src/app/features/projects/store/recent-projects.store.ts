import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IProject } from '../../../shared/models/entities.models';

interface IRecentProjectsStore {
  isLoading: boolean;
  projects: IProject[];
}

export const RecentProjectsStore = signalStore(
  withState<IRecentProjectsStore>({
    isLoading: false,
    projects: []
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProjects: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IProject[] }>('projects/recent').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, projects: data })),
            catchError(() => {
              patchState(store, { isLoading: false, projects: [] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

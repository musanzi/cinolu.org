import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IEvent } from '../../../shared/models';

interface IRecentEventsStore {
  isLoading: boolean;
  events: IEvent[];
}

export const RecentEventsStore = signalStore(
  withState<IRecentEventsStore>({ isLoading: false, events: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IEvent[] }>('events/recent').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, events: data })),
            catchError(() => {
              patchState(store, { isLoading: false, events: [] });
              return of([]);
            })
          );
        })
      )
    )
  }))
);

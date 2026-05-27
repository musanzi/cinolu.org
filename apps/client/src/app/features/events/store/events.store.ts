import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FilterEventsDto } from '../dto/filter-events.dto';
import { buildQueryParams } from '../../../shared/helpers';
import { IEvent } from '../../../shared/models';

interface IEventsStore {
  isLoading: boolean;
  events: [IEvent[], number];
}

export const EventsStore = signalStore(
  withState<IEventsStore>({ isLoading: false, events: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadEvents: rxMethod<FilterEventsDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [IEvent[], number] }>('events/published', { params }).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, events: data })),
            catchError(() => {
              patchState(store, { isLoading: false, events: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

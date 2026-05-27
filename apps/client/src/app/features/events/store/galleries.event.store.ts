import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IImage } from '../../../shared/models';

interface IEventGalleryStore {
  isLoading: boolean;
  images: IImage[];
}

export const GalleryEventStore = signalStore(
  withState<IEventGalleryStore>({ isLoading: false, images: [] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadGallery: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: IImage[] }>(`events/by-slug/${slug}/gallery`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, images: data });
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

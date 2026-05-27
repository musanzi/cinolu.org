import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../../shared/models';

interface IPublicProductStore {
  isLoading: boolean;
  product: IProduct | null;
}

export const PublicProductStore = signalStore(
  withState<IPublicProductStore>({ isLoading: false, product: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadProduct: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, product: null })),
        switchMap((slug) => {
          return _http.get<{ data: IProduct }>(`products/by-slug/${slug}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, product: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, product: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

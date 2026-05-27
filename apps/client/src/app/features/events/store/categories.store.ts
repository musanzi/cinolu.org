import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ICategory } from '../../../shared/models/entities.models';

interface ICategoriesStore {
  isLoading: boolean;
  categories: ICategory[];
}

export const EventCategoriesStore = signalStore(
  withState<ICategoriesStore>({ isLoading: false, categories: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCategories: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: ICategory[] }>('events/categories').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, categories: data })),
            catchError(() => {
              patchState(store, { isLoading: false, categories: [] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadCategories }) => {
      loadCategories();
    }
  })
);

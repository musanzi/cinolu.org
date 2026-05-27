import { signalStore, withState, withMethods, patchState, withProps, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ITag } from '../../../../shared/models';

interface ITagsStore {
  isLoading: boolean;
  tags: ITag[];
}

export const TagsStore = signalStore(
  withState<ITagsStore>({ isLoading: false, tags: [] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadTags: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: ITag[] }>('tags').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, tags: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, tags: [] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit({ loadTags }) {
      loadTags();
    }
  })
);

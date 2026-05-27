import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IArticle } from '../../../../shared/models';

interface IRecentArticlesStore {
  isLoading: boolean;
  articles: IArticle[];
}

export const RecentArticlesStore = signalStore(
  withState<IRecentArticlesStore>({ isLoading: false, articles: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadArticles: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IArticle[] }>('articles/recent').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, articles: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, articles: [] });
              return of([]);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadArticles }) => {
      loadArticles();
    }
  })
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../../../../shared/models/entities.models';
import { FilterCommentsDto } from '../../dto/filter-comments.dto';
import { buildQueryParams } from '../../../../shared/helpers';

interface ICommentsStore {
  isLoading: boolean;
  comments: [IComment[], number];
}

interface ICommmentsParams {
  slug: string;
  dto: FilterCommentsDto;
}

export const CommentsStore = signalStore(
  withState<ICommentsStore>({ isLoading: false, comments: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadComments: rxMethod<ICommmentsParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((p) => {
          const params = buildQueryParams(p.dto);
          return _http.get<{ data: [IComment[], number] }>(`comments/by-article/${p.slug}`, { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, comments: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, comments: [[], 0] });
              return of(null);
            })
          );
        })
      )
    ),
    addComment: (comment: IComment): void => {
      const [comments, count] = store.comments();
      patchState(store, { comments: [[comment, ...comments], count + 1] });
    },
    addComments: (comments: IComment[]): void => {
      const [currentComments, count] = store.comments();
      patchState(store, {
        comments: [[...currentComments, ...comments], count + comments.length]
      });
    },
    updateComment: (comment: IComment): void => {
      const [comments, count] = store.comments();
      const updated = comments.map((c) => (c.id === comment.id ? comment : c));
      patchState(store, { comments: [updated, count] });
    },
    deleteComment: (id: string): void => {
      const [comments, count] = store.comments();
      const filtered = comments.filter((comment) => comment.id !== id);
      patchState(store, { comments: [filtered, count - 1] });
    }
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentDto } from '../../dto/filter-articles.dto';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { IComment } from '../../../../shared/models/entities.models';
import { CommentsStore } from './comments.store';

interface IAddCommentStore {
  isLoading: boolean;
  comments: IComment | null;
}

export const AddCommentStore = signalStore(
  withState<IAddCommentStore>({ isLoading: false, comments: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _commentsStore: inject(CommentsStore),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _commentsStore, _toast, ...store }) => ({
    addComment: rxMethod<CommentDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((comment) => {
          return _http.post<{ data: IComment }>('comments', comment).pipe(
            map(({ data }) => {
              _commentsStore.addComment(data);
              _toast.showSuccess('Le commentaire a été ajouté avec succès');
              patchState(store, { isLoading: false, comments: data });
            }),
            catchError(() => {
              _toast.showError("Une erreur s'est produite lors de l'ajout");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

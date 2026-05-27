import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject, Signal } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IProgram, ISubprogram, IEvent, IProject, IArticle, IHighlight } from '../../../shared/models';

export type HighlightSource = 'programs' | 'subprograms' | 'events' | 'projects' | 'articles';

export type HighlightItem =
  | (IProgram & { sourceKey: 'programs' })
  | (ISubprogram & { sourceKey: 'subprograms' })
  | (IEvent & { sourceKey: 'events' })
  | (IProject & { sourceKey: 'projects' })
  | (IArticle & { sourceKey: 'articles' });

interface IHighlightsStore {
  isLoading: boolean;
  highlights: HighlightItem[];
  _rawHighlights?: IHighlight | null;
}

export const HighlightsStore = signalStore(
  withState<IHighlightsStore>({
    isLoading: false,
    highlights: [],
    _rawHighlights: null
  }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadHighlights: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() =>
          _http.get<{ data: IHighlight }>('highlights').pipe(
            tap(({ data }) => {
              const highlights: HighlightItem[] = [
                ...(data.programs?.map(
                  (item) => ({ ...item, sourceKey: 'programs' }) as IProgram & { sourceKey: 'programs' }
                ) || []),
                ...(data.subprograms?.map(
                  (item) => ({ ...item, sourceKey: 'subprograms' }) as ISubprogram & { sourceKey: 'subprograms' }
                ) || []),
                ...(data.events?.map(
                  (item) => ({ ...item, sourceKey: 'events' }) as IEvent & { sourceKey: 'events' }
                ) || []),
                ...(data.projects?.map(
                  (item) => ({ ...item, sourceKey: 'projects' }) as IProject & { sourceKey: 'projects' }
                ) || []),
                ...(data.articles?.map(
                  (item) => ({ ...item, sourceKey: 'articles' }) as IArticle & { sourceKey: 'articles' }
                ) || [])
              ];
              patchState(store, {
                isLoading: false,
                highlights,
                _rawHighlights: data
              });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, highlights: [], _rawHighlights: null });
              return of(null);
            })
          )
        )
      )
    ),

    getFirstHighlight(
      highlightsSignal: Signal<IHighlight | null | undefined>,
      categoryKeys: HighlightSource[] = ['programs', 'subprograms', 'events', 'projects', 'articles']
    ): HighlightItem | null {
      const highlights = highlightsSignal();
      if (!highlights) return null;

      for (const key of categoryKeys) {
        const items = highlights[key];
        if (items && items.length > 0) {
          return { ...items[0], sourceKey: key } as HighlightItem;
        }
      }
      return null;
    },

    getAllHighlights(): HighlightItem[] {
      return store.highlights();
    }
  }))
);

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SegmentsActions } from './segments.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SegmentsService } from '../../segment/data-acces/segments.service';
import { parseHttpError } from '../../shared/functions/parse';

@Injectable()
export class SegmentsEffects {
  private actions$ = inject(Actions);
  private segmentsService = inject(SegmentsService);

  constructor() {}

  loadSegments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SegmentsActions.load),
      mergeMap(() =>
        this.segmentsService.list().pipe(
          map(items => SegmentsActions.loadSuccess({ items })),
          catchError(error => of(SegmentsActions.loadFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  addSegment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SegmentsActions.add),
      mergeMap(action =>
        this.segmentsService.add(action.item).pipe(
          map(item => SegmentsActions.addSuccess({ item })),
          catchError(error => of(SegmentsActions.addFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  updateSegment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SegmentsActions.update),
      mergeMap(action =>
        this.segmentsService.update(action.item).pipe(
          map(item => SegmentsActions.updateSuccess({ item })),
          catchError(error => of(SegmentsActions.updateFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  deleteSegment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SegmentsActions.delete),
      mergeMap(action =>
        this.segmentsService.delete(action.id).pipe(
          map(() => SegmentsActions.deleteSuccess({ id: action.id })),
          catchError(error => of(SegmentsActions.deleteFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
}
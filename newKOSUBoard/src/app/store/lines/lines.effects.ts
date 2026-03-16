import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LinesActions } from './lines.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LinesService } from '../../line/data-acces/lines.service';
import { parseHttpError } from '../../shared/functions/parse';

@Injectable()
export class LinesEffects {
  private actions$ = inject(Actions);
  private linesService = inject(LinesService);

  constructor() { }

  // Load
  loadLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinesActions.load),
      mergeMap(() =>
        this.linesService.list().pipe(
          map(items => LinesActions.loadSuccess({ items })),
          catchError(error => of(LinesActions.loadFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Add
  addLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinesActions.add),
      mergeMap(action =>
        this.linesService.add(action.item).pipe(
          map(item => LinesActions.addSuccess({ item })),
          catchError(error => of(LinesActions.addFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Update
  updateLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinesActions.update),
      mergeMap(action =>
        this.linesService.update(action.item).pipe(
          map(item => LinesActions.updateSuccess({ item })),
          catchError(error => of(LinesActions.updateFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Delete
  deleteLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinesActions.delete),
      mergeMap(action =>
        this.linesService.delete(action.id).pipe(
          map(() => LinesActions.deleteSuccess({ id: action.id })),
          catchError(error => of(LinesActions.deleteFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
}
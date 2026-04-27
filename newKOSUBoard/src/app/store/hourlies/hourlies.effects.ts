import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HourliesActions, loadHourlies } from './hourlies.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { parseHttpError } from '../../shared/functions/parse';
import { HourliesService } from '../../hourly/data-acces/hourly.service';

@Injectable()
export class HourliesEffects {
  private actions$ = inject(Actions);
  private hourlysService = inject(HourliesService);

  constructor() { }

  // Load
  loadHourlies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHourlies),
      mergeMap(action =>
        this.hourlysService.list(action.teamId,action.assignedDate).pipe(
          map(items => HourliesActions.loadSuccess({ items })),
          catchError(error => of(HourliesActions.loadFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Add
  addHourly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HourliesActions.add),
      mergeMap(action =>
        this.hourlysService.add(action.item).pipe(
          map(item => HourliesActions.addSuccess({ item })),
          catchError(error => of(HourliesActions.addFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Update
  updateHourly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HourliesActions.update),
      mergeMap(action =>
        this.hourlysService.update(action.item).pipe(
          map(item => HourliesActions.updateSuccess({ item })),
          catchError(error => of(HourliesActions.updateFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Delete
  deleteHourly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HourliesActions.delete),
      mergeMap(action =>
        this.hourlysService.delete(action.id).pipe(
          map(() => HourliesActions.deleteSuccess({ id: action.id })),
          catchError(error => of(HourliesActions.deleteFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
}
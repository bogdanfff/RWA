// teams.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '../../teams/data-acces/teams.service';
// teams.effects.ts
import { TeamsActions } from './teams.actions'; // ✅ direktni named import
import { catchError, map, mergeMap, of } from 'rxjs';
import { parseHttpError } from '../../shared/functions/parse';

@Injectable()
export class TeamsEffects {
  private actions$ = inject(Actions);
  private teamsService = inject(TeamsService);
  constructor() { }

  loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.load),  // direktno load
      mergeMap(() =>
        this.teamsService.list().pipe(
          map(items => TeamsActions.loadSuccess({ items })),
          catchError(error => of(TeamsActions.loadFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
  // Add
  addTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.add),           // koristimo univerzalni add
      mergeMap(action =>
        this.teamsService.add(action.item).pipe(    // item umesto team
          map(item => TeamsActions.addSuccess({ item })),  // addSuccess
          catchError(error => of(TeamsActions.addFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Update
  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.update),
      mergeMap(action =>
        this.teamsService.update(action.item).pipe(
          map(item => TeamsActions.updateSuccess({ item })),
          catchError(error => of(TeamsActions.updateFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  // Delete
  deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.delete),
      mergeMap(action =>
        this.teamsService.delete(action.id).pipe(
          map(() => TeamsActions.deleteSuccess({ id: action.id })),
          catchError(error => of(TeamsActions.deleteFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
}
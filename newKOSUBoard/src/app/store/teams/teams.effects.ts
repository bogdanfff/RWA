// teams.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '../../teams/data-acces/teams.service';
import * as TeamsActions from './teams.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TeamsEffects {
  constructor(private actions$: Actions, private teamService: TeamsService) {}

  loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.loadTeams),
      mergeMap(() =>
        this.teamService.getTeams().pipe(
          map(teams => TeamsActions.loadTeamsSuccess({ teams })),
          catchError(error => of(TeamsActions.loadTeamsFailure({ error: error.message })))
        )
      )
    )
  );

  addTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.addTeam),
      mergeMap(action =>
        this.teamService.addTeam(action.team).pipe(
          map(team => TeamsActions.addTeamSuccess({ team })),
          catchError(error => of(TeamsActions.addTeamFailure({ error: error.message })))
        )
      )
    )
  );

  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.updateTeam),
      mergeMap(action =>
        this.teamService.updateTeam(action.team).pipe(
          map(team => TeamsActions.updateTeamSuccess({ team })),
          catchError(error => of(TeamsActions.updateTeamFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.deleteTeam),
      mergeMap(action =>
        this.teamService.deleteTeam(action.id).pipe(
          map(() => TeamsActions.deleteTeamSuccess({ id: action.id })),
          catchError(error => of(TeamsActions.deleteTeamFailure({ error: error.message })))
        )
      )
    )
  );
}

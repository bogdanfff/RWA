// error.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs/operators';
import { TeamsActions } from '../teams/teams.actions';
import { LinesActions } from '../lines/lines.actions';
import { SegmentsActions } from '../segments/segments.actions';
import { UsersActions } from '../users/users.actions';
import { HourliesActions } from '../hourlies/hourlies.actions';

@Injectable()
export class ErrorEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);

  showSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      TeamsActions.addSuccess,
      TeamsActions.updateSuccess,
      TeamsActions.deleteSuccess,

      UsersActions.addSuccess,
      UsersActions.updateSuccess,
      UsersActions.deleteSuccess,

      LinesActions.addSuccess,
      LinesActions.updateSuccess,
      LinesActions.deleteSuccess,

      SegmentsActions.addSuccess,
      SegmentsActions.updateSuccess,
      SegmentsActions.deleteSuccess,

      HourliesActions.addSuccess,
      HourliesActions.updateSuccess,
      HourliesActions.deleteSuccess,
    ),
    tap((action) => {
      this.snackBar.open(action.type, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
    })
  ),
  { dispatch: false }
);

  showError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // ovde stavi sve failure akcije iz CRUD-a
        TeamsActions.loadFailure,
        TeamsActions.addFailure,
        TeamsActions.updateFailure,
        TeamsActions.deleteFailure,

        UsersActions.loadFailure,
        UsersActions.addFailure,
        UsersActions.updateFailure,
        UsersActions.deleteFailure,

        LinesActions.loadFailure,
        LinesActions.addFailure,
        LinesActions.updateFailure,
        LinesActions.deleteFailure,

        SegmentsActions.loadFailure,
        SegmentsActions.addFailure,
        SegmentsActions.updateFailure,
        SegmentsActions.deleteFailure,

        HourliesActions.loadFailure,
        HourliesActions.addFailure,
        HourliesActions.updateFailure,
        HourliesActions.deleteFailure,
      ),
      tap(action => {
        this.snackBar.open(action.error || 'Unknown error', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }),
      map(() => ({ type: '[Error] Handled' })) // mora da vrati akciju, ili set `{ dispatch: false }` ispod
    ),
    { dispatch: false } // ne šaljemo novu akciju dalje
  );
}
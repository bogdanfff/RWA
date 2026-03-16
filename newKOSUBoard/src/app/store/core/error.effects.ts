// error.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs/operators';
import { TeamsActions } from '../teams/teams.actions';
import { LinesActions } from '../lines/lines.actions';
import { SegmentsActions } from '../segments/segments.actions';
import { UsersActions } from '../users/users.actions';

@Injectable()
export class ErrorEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);

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
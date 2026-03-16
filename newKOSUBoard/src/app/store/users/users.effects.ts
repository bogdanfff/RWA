import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../../users/data-acces/users.service';
import { UsersActions } from './users.actions';
import { parseHttpError } from '../../shared/functions/parse';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      mergeMap(() =>
        this.usersService.list().pipe(
          map(items => UsersActions.loadSuccess({ items })),
          catchError(error => of(UsersActions.loadFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.add),
      mergeMap(action =>
        this.usersService.add(action.item).pipe(
          map(item => UsersActions.addSuccess({ item })),
          catchError(error => of(UsersActions.addFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.update),
      mergeMap(action =>
        this.usersService.update(action.item).pipe(
          map(item => UsersActions.updateSuccess({ item })),
          catchError(error => of(UsersActions.updateFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.delete),
      mergeMap(action =>
        this.usersService.delete(action.id).pipe(
          map(() => UsersActions.deleteSuccess({ id: action.id })),
          catchError(error => of(UsersActions.deleteFailure({ error: parseHttpError(error) })))
        )
      )
    )
  );
}
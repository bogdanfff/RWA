import { createReducer, on } from '@ngrx/store';
import { initialUsersState } from './users.state';
import { UsersActions } from './users.actions';

export const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.load, state => ({ ...state, loading: true })),
  on(UsersActions.loadSuccess, (state, { items }) => ({ ...state, loading: false, users: items })),
  on(UsersActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UsersActions.addSuccess, (state, { item }) => ({ ...state, users: [item, ...state.users] })),
  on(UsersActions.addFailure, (state, { error }) => ({ ...state, error })),

  on(UsersActions.updateSuccess, (state, { item }) => ({
    ...state,
    users: state.users.map(u => u.id === item.id ? item : u)
  })),
  on(UsersActions.updateFailure, (state, { error }) => ({ ...state, error })),

  on(UsersActions.deleteSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id)
  })),
  on(UsersActions.deleteFailure, (state, { error }) => ({ ...state, error }))
);
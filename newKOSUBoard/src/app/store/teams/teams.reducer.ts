import { createReducer, on } from '@ngrx/store';
import { initialTeamsState, TeamsState } from './teams.state';
import { TeamsActions } from './teams.actions';

export const teamsReducer = createReducer(
  initialTeamsState,

  // Load
  on(TeamsActions.load, state => ({ ...state, loading: true })),
  on(TeamsActions.loadSuccess, (state, { items }) => ({ ...state, loading: false,loaded:true, teams: items })),
  on(TeamsActions.loadFailure, (state, { error }) => ({ ...state, loading: false,loaded:true, error })),

  // Add
  on(TeamsActions.addSuccess, (state, { item }) => ({ ...state, teams: [item, ...state.teams] })),
  on(TeamsActions.addFailure, (state, { error }) => ({ ...state, error })),

  // Update
  on(TeamsActions.updateSuccess, (state, { item }) => ({
    ...state,
    teams: state.teams.map(t => t.id === item.id ? item : t)
  })),
  on(TeamsActions.updateFailure, (state, { error }) => ({ ...state, error })),

  // Delete
  on(TeamsActions.deleteSuccess, (state, { id }) => ({
    ...state,
    teams: state.teams.filter(t => t.id !== id)
  })),
  on(TeamsActions.deleteFailure, (state, { error }) => ({ ...state, error }))
);
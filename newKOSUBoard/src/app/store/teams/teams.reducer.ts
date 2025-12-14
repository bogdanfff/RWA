// teams.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialTeamsState, TeamsState } from './teams.state';
import * as TeamsActions from './teams.actions';

export const teamsReducer = createReducer(
  initialTeamsState,

  // Load
  on(TeamsActions.loadTeams, state => ({ ...state, loading: true })),
  on(TeamsActions.loadTeamsSuccess, (state, { teams }) => ({ ...state, loading: false, teams })),
  on(TeamsActions.loadTeamsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(TeamsActions.addTeamSuccess, (state, { team }) => ({ ...state, teams: [...state.teams, team] })),
  on(TeamsActions.addTeamFailure, (state, { error }) => ({ ...state, error })),

  // Update
  on(TeamsActions.updateTeamSuccess, (state, { team }) => ({
    ...state,
    teams: state.teams.map(t => t.id === team.id ? team : t)
  })),
  on(TeamsActions.updateTeamFailure, (state, { error }) => ({ ...state, error })),

  // Delete
  on(TeamsActions.deleteTeamSuccess, (state, { id }) => ({
    ...state,
    teams: state.teams.filter(t => t.id !== id)
  })),
  on(TeamsActions.deleteTeamFailure, (state, { error }) => ({ ...state, error }))
);

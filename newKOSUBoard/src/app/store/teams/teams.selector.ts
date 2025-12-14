// teams.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamsState } from './teams.state';

export const selectTeamsState = createFeatureSelector<TeamsState>('teams');

export const selectAllTeams = createSelector(
  selectTeamsState,
  (state: TeamsState) => state.teams
);

export const selectTeamsLoading = createSelector(
  selectTeamsState,
  (state: TeamsState) => state.loading
);

export const selectTeamsError = createSelector(
  selectTeamsState,
  (state: TeamsState) => state.error
);

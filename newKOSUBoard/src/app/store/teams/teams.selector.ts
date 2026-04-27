// teams.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamsState } from './teams.state';
import * as LinesSelectors from '../lines/lines.selector';

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

export const selectTeamsWithAssignedLines = createSelector(
  selectAllTeams,
  LinesSelectors.selectLinesWithAssignedTeam,
  (teams, lines) => {
    const assignedTeamNames = new Set(lines.map(line => line.assignedTeam));
    return teams.filter(team => assignedTeamNames.has(team.teamName));
  }
);



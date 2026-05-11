// lines.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LinesState } from './lines.state';

export const selectLinesState = createFeatureSelector<LinesState>('lines');

export const selectAllLines = createSelector(
  selectLinesState,
  (state: LinesState) => state.lines
);

export const selectLinesLoading = createSelector(
  selectLinesState,
  (state: LinesState) => state.loading
);

export const selectLinesLoaded = createSelector(
  selectLinesState,
  (state: LinesState) => state.loaded
);

export const selectLinesError = createSelector(
  selectLinesState,
  (state: LinesState) => state.error
);

export const selectLinesWithAssignedTeam = createSelector(
  selectAllLines,
  (lines) => lines.filter(line => line.assignedTeam)
);

export const selectLineByTeamId = (teamId: number) => createSelector(
  selectAllLines,
  (lines) => lines.find(line => line.assignedTeamId === teamId)
);

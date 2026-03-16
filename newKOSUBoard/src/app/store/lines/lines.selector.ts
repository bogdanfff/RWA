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

export const selectLinesError = createSelector(
  selectLinesState,
  (state: LinesState) => state.error
);

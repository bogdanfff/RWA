// hourlies.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HourliesState } from './hourlies.state';

export const selectHourliesState = createFeatureSelector<HourliesState>('hourlies');

export const selectAllHourlies = createSelector(
  selectHourliesState,
  (state: HourliesState) => state.hourlies
);

export const selectHourliesLoading = createSelector(
  selectHourliesState,
  (state: HourliesState) => state.loading
);

export const selectHourliesError = createSelector(
  selectHourliesState,
  (state: HourliesState) => state.error
);

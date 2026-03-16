// segments.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SegmentsState } from './segments.state';

export const selectSegmentsState = createFeatureSelector<SegmentsState>('segments');

export const selectAllSegments = createSelector(
  selectSegmentsState,
  (state: SegmentsState) => state.segments
);

export const selectSegmentsLoading = createSelector(
  selectSegmentsState,
  (state: SegmentsState) => state.loading
);

export const selectSegmentsError = createSelector(
  selectSegmentsState,
  (state: SegmentsState) => state.error
);

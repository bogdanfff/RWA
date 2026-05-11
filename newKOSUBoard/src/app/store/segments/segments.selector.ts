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

export const selectSegmentsLoaded = createSelector(
  selectSegmentsState,
  (state: SegmentsState) => state.loaded
);

export const selectSegmentsError = createSelector(
  selectSegmentsState,
  (state: SegmentsState) => state.error
);

export const selectSegmentsDropdown = createSelector(
  selectAllSegments,
  selectSegmentsLoading,
  (segments, loading) => {

    if (loading && segments.length === 0) {
      return [
        {
          id: -1,
          val: 'Loading...'
        }
      ];
    }

    return segments.map(s => ({
      id: s.id,
      val: s.segmentName
    }));
  }
);
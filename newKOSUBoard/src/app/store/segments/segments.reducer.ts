import { createReducer, on } from '@ngrx/store';
import { initialSegmentsState } from './segments.state';
import { SegmentsActions } from './segments.actions';

export const segmentsReducer = createReducer(
  initialSegmentsState,

  on(SegmentsActions.load, state => ({ ...state, loading: true })),
  on(SegmentsActions.loadSuccess, (state, { items }) => ({ ...state, loading: false, segments: items })),
  on(SegmentsActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(SegmentsActions.addSuccess, (state, { item }) => ({ ...state, segments: [item, ...state.segments] })),
  on(SegmentsActions.addFailure, (state, { error }) => ({ ...state, error })),

  on(SegmentsActions.updateSuccess, (state, { item }) => ({
    ...state,
    segments: state.segments.map(s => s.id === item.id ? item : s)
  })),
  on(SegmentsActions.updateFailure, (state, { error }) => ({ ...state, error })),

  on(SegmentsActions.deleteSuccess, (state, { id }) => ({
    ...state,
    segments: state.segments.filter(s => s.id !== id)
  })),
  on(SegmentsActions.deleteFailure, (state, { error }) => ({ ...state, error }))
);
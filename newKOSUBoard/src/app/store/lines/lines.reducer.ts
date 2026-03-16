import { createReducer, on } from '@ngrx/store';
import { initialLinesState, LinesState } from './lines.state';
import { LinesActions } from './lines.actions';

export const linesReducer = createReducer(
  initialLinesState,

  on(LinesActions.load, state => ({ ...state, loading: true })),
  on(LinesActions.loadSuccess, (state, { items }) => ({ ...state, loading: false, lines: items })),
  on(LinesActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(LinesActions.addSuccess, (state, { item }) => ({ ...state, lines: [item, ...state.lines] })),
  on(LinesActions.addFailure, (state, { error }) => ({ ...state, error })),

  on(LinesActions.updateSuccess, (state, { item }) => ({
    ...state,
    lines: state.lines.map(t => t.id === item.id ? item : t)
  })),
  on(LinesActions.updateFailure, (state, { error }) => ({ ...state, error })),

  on(LinesActions.deleteSuccess, (state, { id }) => ({
    ...state,
    lines: state.lines.filter(t => t.id !== id)
  })),
  on(LinesActions.deleteFailure, (state, { error }) => ({ ...state, error }))
);
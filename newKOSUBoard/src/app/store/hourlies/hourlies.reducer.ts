import { createReducer, on } from '@ngrx/store';
import { initialHourliesState } from './hourlies.state';
import { HourliesActions } from './hourlies.actions';

export const hourlysReducer = createReducer(
  initialHourliesState,

  on(HourliesActions.load, state => ({ ...state, loading: true })),
  on(HourliesActions.loadSuccess, (state, { items }) => ({ ...state, loading: false,loaded:true, hourlies: items })),
  on(HourliesActions.loadFailure, (state, { error }) => ({ ...state, loading: false,loaded:true, error })),

  on(HourliesActions.addSuccess, (state, { item }) => ({ ...state, hourlies: [item, ...state.hourlies] })),
  on(HourliesActions.addFailure, (state, { error }) => ({ ...state, error })),

  on(HourliesActions.updateSuccess, (state, { item }) => ({
    ...state,
    hourlies: state.hourlies.map(t => t.id === item.id ? item : t)
  })),
  on(HourliesActions.updateFailure, (state, { error }) => ({ ...state, error })),

  on(HourliesActions.deleteSuccess, (state, { id }) => ({
    ...state,
    hourlies: state.hourlies.filter(t => t.id !== id)
  })),
  on(HourliesActions.deleteFailure, (state, { error }) => ({ ...state, error }))
);
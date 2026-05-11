// clear-state.reducer.ts

import { ActionReducer } from '@ngrx/store';
import * as AppActions from './app.actions';

export function clearStateReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {

  return (state, action) => {

    if (action.type === AppActions.clearState.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
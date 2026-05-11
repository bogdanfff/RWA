import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UsersSelectors from '../../store/users/users.selector';
import { UsersActions } from '../../store/users/users.actions';
import { tap, map, switchMap } from 'rxjs';

export function getSegmentSchema(store: Store): FormField[] {
  return [
    {
      name: 'segmentName',
      label: 'Segment Name',
      type: 'text',
      validators: [Validators.required]
    },

    {
      name: 'segmentLeaderId',
      label: 'Segment Leader',
      type: 'select',
      validators: [Validators.required],
      selectValue: 'id',
      dropDown: store.select(UsersSelectors.selectUsersState).pipe(
              tap(state => {
                if (!state.loaded && !state.loading) {
                  store.dispatch(UsersActions.load());
                }
              }),
              switchMap(() => store.select(UsersSelectors.selectSegmentLeaders)))
    },

    {
      name: 'description',
      label: 'Description',
      type: 'text'
    }
  ];
}
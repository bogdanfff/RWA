import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UsersSelectors from '../../store/users/users.selector';
import { UsersActions } from '../../store/users/users.actions';
import { tap, map } from 'rxjs';

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
      dropDown: store.select(UsersSelectors.selectAllUsers).pipe(
        tap(users => {
          if (!users || users.length === 0) {
            store.dispatch(UsersActions.load());
          }
        }),
        map(users =>
          users
            .filter(u => u.roleName === 'SegmentLeader')
            .map(u => ({
              id: u.id,
              val: u.userName
            }))
        )
      )
    },

    {
      name: 'description',
      label: 'Description',
      type: 'text'
    }
  ];
}
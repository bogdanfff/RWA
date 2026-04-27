import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SegmentsSelectors from '../../store/segments/segments.selector';
import * as UsersSelectors from '../../store/users/users.selector';
import { SegmentsActions } from '../../store/segments/segments.actions';
import { UsersActions } from '../../store/users/users.actions';
import { tap, map } from 'rxjs';

export function getTeamSchema(store: Store): FormField[] {
  return [
    {
      name: 'teamName',
      label: 'Team Name',
      type: 'text'
    },

    {
      name: 'segmentId',
      label: 'Segment Name',
      type: 'select',
      validators: [Validators.required],
      selectValue: 'id',
      dropDown: store.select(SegmentsSelectors.selectAllSegments).pipe(
        tap(segments => {
          if (!segments || segments.length === 0) {
            store.dispatch(SegmentsActions.load());
          }
        }),
        map(segments =>
          segments.map(s => ({
            id: s.id,
            val: s.segmentName
          }))
        )
      )
    },

    {
      name: 'teamLeaderId',
      label: 'Team Leader',
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
            .filter(u => u.roleName === 'TeamLeader')
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
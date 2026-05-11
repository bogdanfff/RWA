import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SegmentsSelectors from '../../store/segments/segments.selector';
import * as UsersSelectors from '../../store/users/users.selector';
import { SegmentsActions } from '../../store/segments/segments.actions';
import { UsersActions } from '../../store/users/users.actions';
import { tap, map, combineLatest, switchMap, take } from 'rxjs';

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
      dropDown: store.select(SegmentsSelectors.selectSegmentsState).pipe(
        tap(state => {
          if (!state.loaded && !state.loading) {
            store.dispatch(SegmentsActions.load());
          }
        }),
        switchMap(() => store.select(SegmentsSelectors.selectSegmentsDropdown))
      )
    },

    {
      name: 'teamLeaderId',
      label: 'Team Leader',
      type: 'select',
      validators: [Validators.required],
      selectValue: 'id',
      dropDown: store.select(UsersSelectors.selectUsersState).pipe(
        tap(state => {
          if (!state.loaded && !state.loading) {
            store.dispatch(UsersActions.load());
          }
        }),
        switchMap(() => store.select(UsersSelectors.selectTeamLeaderDropdown)))
    },

    {
      name: 'description',
      label: 'Description',
      type: 'text'
    }
  ];
}
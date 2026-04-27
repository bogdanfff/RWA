import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SegmentsSelectors from '../../store/segments/segments.selector';
import { SegmentsActions } from '../../store/segments/segments.actions';
import { tap, map } from 'rxjs';

export function getLineSchema(store: Store): FormField[] {
  return [
    {
      name: 'lineName',
      label: 'Line Name',
      type: 'text',
      validators: [Validators.required]
    },

    {
      name: 'segmentNameId',
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
      name: 'description',
      label: 'Description',
      type: 'text'
    }
  ];
}
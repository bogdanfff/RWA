import { FormField, getShiftsByGroup } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export function getHourlySchema(filter?: any): FormField[] {
  return [
    {
      name: 'shiftPatternId',
      label: 'Shift Pattern',
      type: 'select',
      validators: [Validators.required],
      selectValue: 'id',

      dropDown: of(
        getShiftsByGroup(
          filter?.shiftNum,
          filter?.usedShifts
        )
      )
    },

    {
      name: 'employeesNo',
      label: 'Actual Employees',
      type: 'number',
      validators: [Validators.required]
    },

    {
      name: 'workingMinutes',
      label: 'Working Minutes',
      type: 'number',
      validators: [Validators.required]
    },

    {
      name: 'productName',
      label: 'Product',
      type: 'text'
    },

    {
      name: 'producedProductNo',
      label: 'Produced',
      type: 'number',
      validators: [Validators.required]
    },

    {
      name: 'comment',
      label: 'Comment',
      type: 'text'
    }
  ];
}
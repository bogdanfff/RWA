import { createAction, props } from '@ngrx/store';
import { Hourly } from '../../hourly/models/hourlies.model';
import { createCrudActions, CrudActions } from '../core/crud.actions';

// Kreira generičke CRUD akcije za Lines
export const HourliesActions: CrudActions<Hourly> = createCrudActions<Hourly>('Hourly');
export const loadHourlies = createAction(
  '[Hourly] Load',
  props<{ teamId?: number,assignedDate:Date }>()
);
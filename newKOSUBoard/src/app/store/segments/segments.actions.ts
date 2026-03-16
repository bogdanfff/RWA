import { Segment } from '../../segment/models/segments.model';
import { createCrudActions, CrudActions } from '../core/crud.actions';

export const SegmentsActions: CrudActions<Segment> = createCrudActions<Segment>('Segments');
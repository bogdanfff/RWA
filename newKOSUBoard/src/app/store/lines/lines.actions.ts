import { Line } from '../../line/models/lines.model';
import { createCrudActions, CrudActions } from '../core/crud.actions';

// Kreira generičke CRUD akcije za Lines
export const LinesActions: CrudActions<Line> = createCrudActions<Line>('Lines');
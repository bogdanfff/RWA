import { User } from '../../users/models/users.model';
import { createCrudActions, CrudActions } from '../core/crud.actions';

export const UsersActions: CrudActions<User> = createCrudActions<User>('Users');
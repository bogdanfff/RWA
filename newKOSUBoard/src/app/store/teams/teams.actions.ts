// // teams.actions.ts
// import { createAction, props } from '@ngrx/store';
// import { Team } from '../../teams/models/teams.model';

import { Team } from "../../teams/models/teams.model";
import { CrudActions, createCrudActions } from "../core/crud.actions";



export const TeamsActions: CrudActions<Team> = createCrudActions<Team>('Teams');
// // teams.actions.ts
// import { createAction, props } from '@ngrx/store';
// import { Team } from '../../teams/models/teams.model';

import { Team } from "../../teams/models/teams.model";
import { CrudActions, createCrudActions } from "../core/crud.actions";

// // Load
// export const loadTeams = createAction('[Teams] Load Teams');
// export const loadTeamsSuccess = createAction('[Teams] Load Teams Success', props<{ teams: Team[] }>());
// export const loadTeamsFailure = createAction('[Teams] Load Teams Failure', props<{ error: string }>());

// // Add
// export const addTeam = createAction('[Teams] Add Team', props<{ team: Team }>());
// export const addTeamSuccess = createAction('[Teams] Add Team Success', props<{ team: Team }>());
// export const addTeamFailure = createAction('[Teams] Add Team Failure', props<{ error: string }>());

// // Update
// export const updateTeam = createAction('[Teams] Update Team', props<{ team: Team }>());
// export const updateTeamSuccess = createAction('[Teams] Update Team Success', props<{ team: Team }>());
// export const updateTeamFailure = createAction('[Teams] Update Team Failure', props<{ error: string }>());

// // Delete
// export const deleteTeam = createAction('[Teams] Delete Team', props<{ id: number }>());
// export const deleteTeamSuccess = createAction('[Teams] Delete Team Success', props<{ id: number }>());
// export const deleteTeamFailure = createAction('[Teams] Delete Team Failure', props<{ error: string }>());

// import { createCrudActions } from '../crud.actions';


export const TeamsActions: CrudActions<Team> = createCrudActions<Team>('Teams');
console.log('TeamsActions =', TeamsActions);
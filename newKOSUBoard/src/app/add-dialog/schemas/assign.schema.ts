import { FormField } from '../models';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TeamSelectors from '../../store/teams/teams.selector';
import * as LinesSelectors from '../../store/lines/lines.selector';
import { TeamsActions } from '../../store/teams/teams.actions';
import { tap, map, combineLatest, of, switchMap } from 'rxjs';
import { minTodayDateValidator } from '../../shared/validators/validator';

export function getAssignSchema(store: Store, filter?: any): FormField[] {
  return[
          {
  
            name: 'assignedTeamId',
            label: 'Team',
            type: 'select',
            validators: [Validators.required],
            selectValue: 'id',
            dropDown: combineLatest([
              store.select(TeamSelectors.selectTeamsState).pipe(
                tap(state => {
                  if (!state.loaded && !state.loading) store.dispatch(TeamsActions.load());
                }), map(state => {
                  if (filter?.['segmentId'] != null) {
                    state.teams = state.teams.filter(t => t.segmentId === filter?.['segmentId']);
                  }
                  return state.teams;
                })),
              store.select(LinesSelectors.selectAllLines)
            ]).pipe(
              switchMap(() => store.select(TeamSelectors.selectAssignedTeams))
              //  map(([teams, lines]) => {
              //   const assignedTeamIds = new Set(lines
              //     .filter(line => line.assignedTeamId)
              //     .map(line => line.assignedTeamId)
              //   );
              //   const result = teams
              //     .filter(team => !assignedTeamIds.has(team.id))
              //     .map(t => ({ id: t.id, val: t.teamName }));
              //   return result;
              // })
            )
          },
          {
            name: 'assignedShift',
            label: 'Shift',
            type: 'select',
            validators: [Validators.required],
            selectValue: 'val',
            dropDown: of(
              Array.from({ length: 3 }, (_, i) => ({
                id: i + 1,
                val: String(i + 1),
              }))
            )
          },
          {
            name: 'assignedShiftDate',
            label: 'Shift Date',
            type: 'date',
            validators: [Validators.required,minTodayDateValidator()],
            errorText:'Shift date is required and cannot be in the past'
          },
          {
            name: 'assignedTarget',
            label: 'Assigned Target',
            type: 'number',
            validators: [Validators.required]
          },
          {
            name: 'assignedEmployeesNo',
            label: 'Employees Number',
            type: 'number',
            validators: [Validators.required]
          }
        ]
}
import { inject, Injectable } from '@angular/core';
import { FormField, getShiftsByGroup } from '../models';
import { Store } from '@ngrx/store';
import * as SegmentsSelectors from '../../store/segments/segments.selector';
import * as UsersSelectors from '../../store/users/users.selector';
import * as TeamSelectors from '../../store/teams/teams.selector';
import * as LinesSelectors from '../../store/lines/lines.selector';
import { combineLatest, filter, map, of, tap } from 'rxjs';
import { Validators } from '@angular/forms';
import { allRoles } from '../../users/models/users.model';
import { SegmentsActions } from '../../store/segments/segments.actions';
import { UsersActions } from '../../store/users/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { CrudActions } from '../../store/core/crud.actions';
import { AddDialogComponent } from '../ui/add-dialog.component';
import { allEntities, DialogData } from '../../shared/models/globalModels';
import { TeamsActions } from '../../store/teams/teams.actions';
import { minTodayDateValidator } from '../../shared/validators/validator';
import { getAssignSchema } from '../schemas/assign.schema';
import { getHourlySchema } from '../schemas/hourly.schema';
import { getLineSchema } from '../schemas/line.schema';
import { getSegmentSchema } from '../schemas/segment.schema';
import { getTeamSchema } from '../schemas/team.schema';
import { getUserSchema } from '../schemas/user.schema';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);


  constructor() { }

  getSchemas(filter?: { [key: string]: any }): { [key: string]: any } {
    return {
      user: getUserSchema(this.store),

      team: getTeamSchema(this.store),

      line: getLineSchema(this.store),

      segment: getSegmentSchema(this.store),

      assign: getAssignSchema(this.store, filter),

      hourly: getHourlySchema(filter)
    };
  }
  getSchemas2(filter?: { [key: string]: any }): { [key: string]: FormField[] } {
    return {

      // ================= USER =================
      user: [
        {
          name: 'userName',
          label: 'Username',
          type: 'text',
          validators: [Validators.required, Validators.minLength(5)]
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          validators: [Validators.minLength(5)]
        },
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'roleName', label: 'Role', type: 'select', selectValue: 'val', dropDown: of(allRoles) },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          validators: [Validators.email]
        },
        {
          name: 'phoneNumber',
          label: 'Phone',
          type: 'text',
          validators: [
            Validators.pattern('[0-9]+'),
            Validators.minLength(7),
            Validators.maxLength(15)
          ]
        },
        {
          name: 'teamId',
          label: 'Team',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: this.store.select(TeamSelectors.selectAllTeams).pipe(
            tap(teams => {
              if (!teams || teams.length === 0) {
                this.store.dispatch(TeamsActions.load());
              }
            }), map(teams => teams.map(s => ({ id: s.id, val: s.teamName })))
          )
        },
        {
          name: 'active',
          label: 'Active',
          type: 'checkbox'
        }
      ],

      // ================= LINE =================
      line: [
        { name: 'lineName', label: 'Line Name', type: 'text', validators: [Validators.required] },
        {
          name: 'segmentNameId',
          label: 'Segment Name',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: this.store.select(SegmentsSelectors.selectAllSegments).pipe(
            tap(segments => {
              if (!segments || segments.length === 0) {
                this.store.dispatch(SegmentsActions.load());
              }
            }), map(segments => segments.map(s => ({ id: s.id, val: s.segmentName })))
          )
        },
        { name: 'description', label: 'Description', type: 'text' }
      ],

      // ================= TEAM =================
      team: [
        { name: 'teamName', label: 'Team Name', type: 'text' },
        {
          name: 'segmentId',
          label: 'Segment Name',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: this.store.select(SegmentsSelectors.selectAllSegments).pipe(
            tap(segments => {
              if (!segments || segments.length === 0) {
                this.store.dispatch(SegmentsActions.load());
              }
            }), map(segments => segments.map(s => ({ id: s.id, val: s.segmentName })))
          )
        },
        {
          name: 'teamLeaderId',
          label: 'Team Leader',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: this.store.select(UsersSelectors.selectAllUsers).pipe(
            tap(users => {
              if (!users || users.length === 0) {
                this.store.dispatch(UsersActions.load());
              }
            })

            , map(users => users.filter(us => us.roleName == 'TeamLeader').map(u => ({ id: u.id, val: u.userName })))
          )
        },
        { name: 'description', label: 'Description', type: 'text' }
      ],

      // ================= SEGMENT =================
      segment: [
        { name: 'segmentName', label: 'Segment Name', type: 'text', validators: [Validators.required] },
        {
          name: 'segmentLeaderId',
          label: 'Segment Leader',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: this.store.select(UsersSelectors.selectAllUsers).pipe(
            tap(users => {
              if (!users || users.length === 0) {
                this.store.dispatch(UsersActions.load());
              }
            })

            , map(users => users.filter(us => us.roleName == 'SegmentLeader').map(u => ({ id: u.id, val: u.userName })))
          )
        },
        { name: 'description', label: 'Description', type: 'text' }
      ],
      // ================= ASSIGN TEAM =================
      assign: [
        {

          name: 'assignedTeamId',
          label: 'Team',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: combineLatest([
            this.store.select(TeamSelectors.selectAllTeams).pipe(
              tap(teams => {
                if (!teams?.length) this.store.dispatch(TeamsActions.load());
              }), map(teams => {
                if (filter?.['segmentId'] != null) {
                  teams = teams.filter(t => t.segmentId === filter?.['segmentId']);
                }
                return teams;
              })),
            this.store.select(LinesSelectors.selectAllLines)
          ]).pipe(
            map(([teams, lines]) => {
              const assignedTeamIds = new Set(lines
                .filter(line => line.assignedTeamId)
                .map(line => line.assignedTeamId)
              );
              const result = teams
                .filter(team => !assignedTeamIds.has(team.id))
                .map(t => ({ id: t.id, val: t.teamName }));
              return result;
            })
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
      ],
      // ================= HOURLY =================
      hourly: [
        // { name: 'lineName', label: 'Line Name', type: 'text', validators: [Validators.required] },
        {
          name: 'shiftPatternId',
          label: 'Shift Pattern',
          type: 'select',
          validators: [Validators.required],
          selectValue: 'id',
          dropDown: of(getShiftsByGroup(filter?.["shiftNum"],filter?.["usedShifts"]))
        },
        { name: 'employeesNo', label: 'Actual Employees', type: 'number', validators: [Validators.required] },
        { name: 'workingMinutes', label: 'Working Minutes', type: 'number', validators: [Validators.required] },
        { name: 'productName', label: 'Product', type: 'text' },
        { name: 'producedProductNo', label: 'Produced', type: 'number', validators: [Validators.required] },
        { name: 'comment', label: 'Comment', type: 'text' },
      ]
    };
  }
  open<T>(
    entity: allEntities,
    value: T | undefined,
    actions: CrudActions<T>,
    additionalData?: {
      dialogAdditional?: { [key: string]: any };
      returnAdditional?: { [key: string]: any };
    }
  ) {
    const dialogRef = this.dialog.open<AddDialogComponent<T>, DialogData<T>>(AddDialogComponent, {
      data: { entity, edit: !!value, value: value ?? null, dialogAdditional: additionalData?.dialogAdditional }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (value && (value as any).id) {
        this.store.dispatch(
          actions.update({ item: { ...result, id: (value as any).id, ...additionalData?.returnAdditional } })
        );
      } else {
        const payload = { ...result, ...additionalData?.returnAdditional };
        this.store.dispatch(
          actions.add({ item: payload })
        );
      }
    });
  }

}

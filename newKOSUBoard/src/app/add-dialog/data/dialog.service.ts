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

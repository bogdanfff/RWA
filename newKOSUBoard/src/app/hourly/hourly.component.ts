import { Component, inject, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Subject, Observable, takeUntil, tap, filter, map, combineLatest, take } from "rxjs";
import { TableAction, TableAddButton } from "../shared/ui/table/models/table.model";
import * as HourliesSelectors from '../store/hourlies/hourlies.selector';
import * as TeamsSelectors from '../store/teams/teams.selector';
import * as LinesSelectors from '../store/lines/lines.selector';
import { TableComponent } from "../shared/ui/table/table.component";
import { AsyncPipe } from "@angular/common";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { DialogService } from "../add-dialog/data/dialog.service";
import { columnsHourlies, displayedColumnsHourlies, Hourly } from "./models/hourlies.model";
import { HourliesActions, loadHourlies } from "../store/hourlies/hourlies.actions";
import { DropdownFilterComponent } from "../shared/ui/table/filters/dropDown.filter";
import { Team } from "../teams/models/teams.model";
import { TeamsActions } from "../store/teams/teams.actions";
import { LinesActions } from "../store/lines/lines.actions";
import { Line } from "../line/models/lines.model";
import { AuthService } from "../auth/data-access/auth.service";


@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [TableComponent, AsyncPipe, MatDialogModule, DropdownFilterComponent],
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']

})
export class HourlyComponent {
  columns = columnsHourlies
  displayedColumns = displayedColumnsHourlies
  selectedTeamId!: number
  selectedShift!: number
  selectedLineId!: number

  actions = createTableActions<Hourly>(
    (hourly) => this.addOrEditHourly(hourly),
    (hourly) => this.deleteHourly(hourly.id)
  );

  addButton = createAddButton('New hourly', () => this.addOrEditHourly());

  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)
  private readonly auth = inject(AuthService);
  user = this.auth.getUser()

  private destroy$ = new Subject<void>();
  teams$: Observable<Team[]>;
  lines$: Observable<Line[]>
  hourlies$: Observable<Hourly[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usedShifts$: Observable<number[]>
  constructor() {

    this.hourlies$ = this.store.select(HourliesSelectors.selectAllHourlies)
    this.usedShifts$ = this.hourlies$.pipe(
      map(hourlies => hourlies.map(h => h.shiftPatternId))
    );
    this.loading$ = this.store.select(HourliesSelectors.selectHourliesLoading);
    this.error$ = this.store.select(HourliesSelectors.selectHourliesError);

    this.teams$ = this.store.select(TeamsSelectors.selectTeamsWithAssignedLines);
    this.lines$ = this.store.select(LinesSelectors.selectLinesWithAssignedTeam);
  }
  filterHourlies(teamId: number) {

    this.selectedTeamId = teamId
    this.store.select(LinesSelectors.selectLineByTeamId(teamId)).pipe(
      take(1)
    ).subscribe(line => {
      if (line) {
        this.selectedShift = line.assignedShift!;
        this.selectedLineId = line.id
        // console.log(line.assignedShiftDate);

        this.store.dispatch(loadHourlies({
          teamId: teamId,
          assignedDate: new Date(line.assignedShiftDate!)
        }))
      }
    });

    // selectedShift$ = combineLatest([this.lines$, this.selectedTeamId$]).pipe(
    //   map(([lines, teamId]) => lines.find(line => line.assignedTeamId === teamId)?.assignedShift)
    // );
  }
  ngOnInit(): void {
    this.store.dispatch(TeamsActions.load());
    this.store.dispatch(LinesActions.load());
  }

  addOrEditHourly(hourly?: Hourly) {
    if (!this.selectedTeamId) return
    this.usedShifts$.pipe(take(1)).subscribe(used => {
      this.addEditDialog.open<Hourly>(
        'hourly',
        hourly,
        HourliesActions,
        {
          returnAdditional: { teamId: this.selectedTeamId, insertedBy: this.user?.userName!, lineId: this.selectedLineId },
          dialogAdditional: { shiftNum: this.selectedShift, usedShifts:used }
        });
    }
    )
  }

  deleteHourly(id: number) {
    this.store.dispatch(HourliesActions.delete({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
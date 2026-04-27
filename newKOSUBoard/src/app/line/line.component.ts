import { Component, inject, ViewChild } from "@angular/core";
import { columnsLines, displayedColumnsLines } from "./models/lines.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Subject, Observable, takeUntil } from "rxjs";
import { Line } from "../line/models/lines.model";
import { TableAction, TableAddButton } from "../shared/ui/table/models/table.model";
import * as LinesSelectors from '../store/lines/lines.selector';
import { TableComponent } from "../shared/ui/table/table.component";
import { AsyncPipe } from "@angular/common";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { LinesActions } from "../store/lines/lines.actions";
import { DialogService } from "../add-dialog/data/dialog.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableFilterComponent } from "../shared/ui/table/filters/text.filter";
import { AuthService } from "../auth/data-access/auth.service";


@Component({
  selector: 'app-line',
  standalone: true,
  imports: [TableComponent, AsyncPipe, MatInputModule, TableFilterComponent],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']

})
export class LineComponent {
  columns = columnsLines
  displayedColumns = displayedColumnsLines

  actions = createTableActions<Line>(
    (line) => this.addOrEditLine(line),
    (line) => this.deleteLine(line.id)
  );

  addButton = createAddButton('New line', () => this.addOrEditLine());
  assignButton = createAddButton<Line>('Assign', (line) => this.addOrEditLine(line, true));

  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)
  private readonly auth = inject(AuthService);
  user = this.auth.getUser()?.userName

  private destroy$ = new Subject<void>();

  lines$: Observable<Line[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor() {
    
    this.addUnassignButton()
    this.lines$ = this.store.select(LinesSelectors.selectAllLines);
    this.loading$ = this.store.select(LinesSelectors.selectLinesLoading);
    this.error$ = this.store.select(LinesSelectors.selectLinesError);

    this.lines$.pipe(takeUntil(this.destroy$))
  }

  ngOnInit(): void {
    this.store.dispatch(LinesActions.load());
  }

  addOrEditLine(line?: Line, assign?: boolean) {
    this.addEditDialog.open<Line>(
      assign ? 'assign' : 'line',
      line, LinesActions,
      { returnAdditional: { assignedByUser: this.user! } });
  }

  deleteLine(id: number) {
    this.store.dispatch(LinesActions.delete({ id }));
  }

  unassignTeam(line: Line) {
    this.store.dispatch(LinesActions.update({
      item: {
        ...line, assignedTeamId: null,
        assignedShift: null,
        assignedShiftDate: null,
        assignedTarget: null,
        assignedByUser: null,
        assignedEmployeesNo: null
      }
    }));
  }
  addUnassignButton() {
    this.actions.push({
      icon: 'unsubscribe',
      tooltip: 'Unassign',
      warn: true,
      action: (line) => this.unassignTeam(line)
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
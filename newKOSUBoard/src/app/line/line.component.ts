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


@Component({
  selector: 'app-line',
  standalone: true,
  imports: [TableComponent, AsyncPipe, MatDialogModule],
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
  assignButton = createAddButton('Assign', () => this.addOrEditLine());

  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<void>();

  lines$: Observable<Line[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  linesData = new MatTableDataSource<Line>([]);
  constructor() {
    this.lines$ = this.store.select(LinesSelectors.selectAllLines);
    this.loading$ = this.store.select(LinesSelectors.selectLinesLoading);
    this.error$ = this.store.select(LinesSelectors.selectLinesError);

    this.lines$.pipe(takeUntil(this.destroy$)).subscribe(lines => this.linesData.data = lines);
  }

  ngOnInit(): void {
    this.store.dispatch(LinesActions.load());
  }

  ngAfterViewInit() {
    this.linesData.paginator = this.paginator;
  }

  addOrEditLine(line?: Line) {
    this.addEditDialog.open<Line>('line', line, LinesActions);
  }

  deleteLine(id: number) {
    this.store.dispatch(LinesActions.delete({ id }));
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.linesData.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
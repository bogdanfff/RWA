import { Component, inject, ViewChild } from "@angular/core";
import { TableComponent } from "../shared/ui/table/table.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Subject, Observable, takeUntil } from "rxjs";
import { columnsSegments, displayedColumnsSegments, Segment } from "./models/segments.model";
import * as SegmentsSelectors from '../store/segments/segments.selector';
import { TableAction, TableAddButton } from "../shared/ui/table/models/table.model";
import { AsyncPipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { User } from "../users/models/users.model";
import { SegmentsActions } from "../store/segments/segments.actions";
import { DialogService } from "../add-dialog/data/dialog.service";
import { TableFilterComponent } from "../shared/ui/table/filters/text.filter";


@Component({
  selector: 'app-segment',
  standalone: true,
  imports: [TableComponent, AsyncPipe,TableFilterComponent],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent {
  columns = columnsSegments
  displayedColumns = displayedColumnsSegments

  actions = createTableActions<Segment>(
    (segment) => this.addOrEditSegment(segment),
    (segment) => this.deleteSegment(segment.id)
  );

  addButton = createAddButton('New segment', () => this.addOrEditSegment());


  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<void>();
  segments$: Observable<Segment[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor() {
    this.segments$ = this.store.select(SegmentsSelectors.selectAllSegments);
    this.loading$ = this.store.select(SegmentsSelectors.selectSegmentsLoading);
    this.error$ = this.store.select(SegmentsSelectors.selectSegmentsError);

    this.segments$.pipe(takeUntil(this.destroy$))
  }

  ngOnInit(): void {
    setInterval(() => {

    }, 2000);
    // Load all segments on init
    this.store.dispatch(SegmentsActions.load());
  }

  addOrEditSegment(segment?: Segment) {
    this.addEditDialog.open<Segment>('segment', segment, SegmentsActions);
  }

  updateSegment(segment: Segment) {
    this.store.dispatch(SegmentsActions.update({ item: segment }));
  }

  deleteSegment(id: number) {
    this.store.dispatch(SegmentsActions.delete({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
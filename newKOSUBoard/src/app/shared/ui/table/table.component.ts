import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  inject
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableAddButton } from './models/table.model';
import { ConfirmationDialogComponent } from '../../components/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],

})
export class TableComponent<T> implements AfterViewInit {
  @Input() loading: boolean | null = false
  @Input() data: T[] | null = [];
  @Input() columns: { key: Extract<keyof T, string>; label: string; formatter?: (value: any) => string; }[] = [];
  @Input() actions: {
    icon: string;
    tooltip: string;
    warn?:boolean
    action: (row: T) => void;
  }[] = [];
  @Input() pageSize = 5;
  @Input() addButton!: TableAddButton
  @Input() assignButton!: TableAddButton
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<T>();

  get displayedColumns(): string[] {
    return [
      ...this.columns.map(c => c.key as string),
      ...(this.actions.length ? ['actions'] : [])
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = this.data!;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirm(row: T, action: { action: (row: T) => void }, message: string = 'Are you sure you want to proceed?') {
    
    console.log('aaaaaaaaaaaaa');
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { title: 'Warning', message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User clicked Yes');
        action.action(row); // izvrši originalnu akciju
      } else {
        console.log('User clicked Cancel');
      }
    });
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="filter-input">
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="onFilter($event)" placeholder="Ex. ium" />
    </mat-form-field>
  `
})
export class TableFilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterChange.emit(value);
  }
}
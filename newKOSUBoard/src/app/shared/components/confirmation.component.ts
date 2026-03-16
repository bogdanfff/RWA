import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{'Confirmation'|translate}}</h2>
    <mat-dialog-content>{{data.message|translate}}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">{{'Yes'|translate}}</button>
      <button mat-button [mat-dialog-close]="false">{{'No'|translate}}</button>
    </mat-dialog-actions>
  `,
  imports: [MatTableModule,CommonModule,TranslateModule,MatIconModule,MatDialogModule,MatButton],
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

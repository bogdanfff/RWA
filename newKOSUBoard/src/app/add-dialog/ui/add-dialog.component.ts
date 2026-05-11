import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormField } from '../models';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DialogService } from '../data/dialog.service';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogData } from '../../shared/models/globalModels';
import { Line } from '../../line/models/lines.model';
import { Hourly } from '../../hourly/models/hourlies.model';
@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, CommonModule, MatOption, MatSelectModule, MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatTooltipModule,
  ], templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent<T> {
  readonly translateService = inject(TranslateService)
  readonly dialogRef = inject(MatDialogRef<AddDialogComponent<T>>);
  readonly dialogService = inject(DialogService)
  readonly data = inject(MAT_DIALOG_DATA) as DialogData<T>;
  edit = this.data.edit
  form!: FormGroup;
  fields!: FormField[];
  filter = this.getFilter()
  lineName = this.data.entity == 'assign' ? (this.data.value as Line).lineName : ''
  constructor() {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    // console.log(this.data.value);

    this.fields = this.dialogService.getSchemas(this.filter)[this.data.entity];
    const group: any = {};
    this.fields.forEach(field => {
      const defaultValue =
        (this.data.value as any)?.[field.name] ??
        (field.type === 'select' ? null : '');
      group[field.name] = new FormControl(defaultValue, field.validators || []);
      // const defaultValue = (this.data.value as any)?.[field.name] ?? '';
      // group[field.name] = new FormControl(defaultValue, field.validators || []);
    });

    this.form = new FormGroup(group);

  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
  getFilter(): any {
    switch (this.data.entity) {
      case 'assign':
        return {
          segmentId: (this.data.value as Line)?.segmentNameId
        };
      case 'hourly':
        return this.data.dialogAdditional
      default:
        return undefined;
    }
  }
  getTitle() {
    const ed = this.lineName ? '' : (this.edit ? 'Edit ' : 'Add ')
    const result = this.lineName ? (this.data.entity.charAt(0).toUpperCase() + this.data.entity.slice(1) + ' on') : this.data.entity;
    return this.translateService.instant(((ed) + result)) + ` ${this.lineName}`
  }
}

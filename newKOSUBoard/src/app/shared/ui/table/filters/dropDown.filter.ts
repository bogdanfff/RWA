import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOption, MatSelectModule } from "@angular/material/select";
import { Observable, tap } from "rxjs";
import { Team } from "../../../../teams/models/teams.model";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-dropdown-filter',
  standalone: true,
  imports: [TranslatePipe,CommonModule, MatFormFieldModule, MatOption, MatSelectModule],
  template: `
   <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{'Teams'|translate}}</mat-label>
        <mat-select [(value)]="selectedTeamId" (selectionChange)="onSelect($event.value)">
          <mat-option *ngFor="let team of teams | async"
            [value]="team.id">
            {{ team.teamName }}
          </mat-option>
        </mat-select>
      </mat-form-field>
  `
})
export class DropdownFilterComponent {
    @Output() filterChange = new EventEmitter<number>();
    @Input() teams!: Observable<Team[]>;
    selectedTeamId!: number;

    ngOnInit() {
        this.teams.pipe(
            tap(teamsArray => {
                if (teamsArray?.length && !this.selectedTeamId) {
                    this.selectedTeamId = teamsArray[0].id;
                    this.filterChange.emit(this.selectedTeamId);
                }
            })
        ).subscribe();
    }

    onSelect(teamId: number) {
        this.selectedTeamId = teamId;
        this.filterChange.emit(teamId);
    }
}
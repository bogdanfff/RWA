import { Component, inject, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { columnsTeams, displayedColumnsTeams, Team } from "./models/teams.model";
import { TableAction, TableAddButton } from "../shared/ui/table/models/table.model";
import * as TeamsSelectors from '../store/teams/teams.selector';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatLabel } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { TableComponent } from "../shared/ui/table/table.component";
import { MatDialog } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { TeamsActions } from "../store/teams/teams.actions";
import { DialogService } from "../add-dialog/data/dialog.service";
import { TableFilterComponent } from "../shared/ui/table/filters/text.filter";



@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule,  CommonModule, TableComponent,TableFilterComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  columns = columnsTeams
  displayedColumns = displayedColumnsTeams

  actions = createTableActions<Team>(
    (team) => this.addOrEditTeam(team),
    (team) => this.deleteTeam(team.id)
  );

  addButton = createAddButton('New team', () => this.addOrEditTeam());

  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)
  
  private destroy$ = new Subject<void>();
  teams$: Observable<Team[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor() {
    this.teams$ = this.store.select(TeamsSelectors.selectAllTeams);
    this.loading$ = this.store.select(TeamsSelectors.selectTeamsLoading);
    this.error$ = this.store.select(TeamsSelectors.selectTeamsError);

    this.teams$.pipe(takeUntil(this.destroy$))
  }

  ngOnInit(): void {
    // Load all teams on init
    this.store.dispatch(TeamsActions.load());
  }

  addOrEditTeam(team?: Team) {
    this.addEditDialog.open<Team>('team', team, TeamsActions);
  }

  deleteTeam(id: number) {
    this.store.dispatch(TeamsActions.delete({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
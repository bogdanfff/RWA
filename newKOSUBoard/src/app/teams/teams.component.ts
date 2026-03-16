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
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from "../shared/ui/table/table.component";
import { MatDialog } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { User } from "../users/models/users.model";
import { TeamsActions } from "../store/teams/teams.actions";
import { DialogService } from "../add-dialog/data/dialog.service";



@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [MatTooltipModule, FormsModule, TranslateModule, MatTableModule, CommonModule, MatIconModule, MatInputModule, MatPaginatorModule, TableComponent],
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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<void>();
  teams$: Observable<Team[]>;       // Observable of all teams
  loading$: Observable<boolean>;     // Loading state
  error$: Observable<string | null>; // Error state
  teamsData = new MatTableDataSource<Team>([]);
  constructor() {
    this.teams$ = this.store.select(TeamsSelectors.selectAllTeams);
    this.loading$ = this.store.select(TeamsSelectors.selectTeamsLoading);
    this.error$ = this.store.select(TeamsSelectors.selectTeamsError);

    this.teams$.pipe(takeUntil(this.destroy$)).subscribe(teams => this.teamsData.data = teams);
  }

  ngOnInit(): void {
    // Load all teams on init
    this.store.dispatch(TeamsActions.load());
  }
  ngAfterViewInit() {
    this.teamsData.paginator = this.paginator;
  }

  addOrEditTeam(team?: Team) {
    this.addEditDialog.open<Team>('team', team, TeamsActions);
  }

  deleteTeam(id: number) {
    this.store.dispatch(TeamsActions.delete({ id }));
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teamsData.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
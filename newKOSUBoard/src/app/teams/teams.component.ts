import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Team } from "./models/teams.model";
import * as TeamsActions from '../store/teams/teams.actions';
import * as TeamsSelectors from '../store/teams/teams.selector';


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams$: Observable<Team[]>;       // Observable of all teams
  loading$: Observable<boolean>;     // Loading state
  error$: Observable<string | null>; // Error state

  constructor(private store: Store) {
    this.teams$ = this.store.select(TeamsSelectors.selectAllTeams);
    this.loading$ = this.store.select(TeamsSelectors.selectTeamsLoading);
    this.error$ = this.store.select(TeamsSelectors.selectTeamsError);
  }

  ngOnInit(): void {
    // Load all teams on init
    this.store.dispatch(TeamsActions.loadTeams());
  }

  addTeam(team: Team) {
    this.store.dispatch(TeamsActions.addTeam({ team }));
  }

  updateTeam(team: Team) {
    this.store.dispatch(TeamsActions.updateTeam({ team }));
  }

  deleteTeam(id: number) {
    this.store.dispatch(TeamsActions.deleteTeam({ id }));
  }
}
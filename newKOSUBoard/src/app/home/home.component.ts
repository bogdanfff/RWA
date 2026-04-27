import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { NgChartsModule } from 'ng2-charts';
import { Subject, Observable, map, combineLatest, take, BehaviorSubject } from "rxjs";
import { DialogService } from "../add-dialog/data/dialog.service";
import { AuthService } from "../auth/data-access/auth.service";
import { columnsHourlies, displayedColumnsHourlies, Hourly, shiftPatternHours } from "../hourly/models/hourlies.model";
import { Line } from "../line/models/lines.model";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { loadHourlies, HourliesActions } from "../store/hourlies/hourlies.actions";
import { LinesActions } from "../store/lines/lines.actions";
import { TeamsActions } from "../store/teams/teams.actions";
import { Team } from "../teams/models/teams.model";
import * as HourliesSelectors from '../store/hourlies/hourlies.selector';
import * as TeamsSelectors from '../store/teams/teams.selector';
import * as LinesSelectors from '../store/lines/lines.selector';
import { DropdownFilterComponent } from "../shared/ui/table/filters/dropDown.filter";
import { AsyncPipe } from "@angular/common";
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from "@ngx-translate/core";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgChartsModule, DropdownFilterComponent, AsyncPipe, MatRadioModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  columns = columnsHourlies
  displayedColumns = displayedColumnsHourlies
  selectedTeamId!: number
  selectedShift!: number
  selectedLineId!: number
  readonly store = inject(Store)

  private destroy$ = new Subject<void>();
  teams$: Observable<Team[]>;
  lines$: Observable<Line[]>
  hourlies$: Observable<Hourly[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  lineChartData$!: Observable<any>
  selectedMetric$ = new BehaviorSubject<string>("1");
  constructor() {

    this.hourlies$ = this.store.select(HourliesSelectors.selectAllHourlies);
    this.lineChartData$ = combineLatest([
      this.hourlies$,
      this.selectedMetric$
    ]).pipe(
      map(([hourlies, metric]) => ({
        labels: hourlies.map(h => shiftPatternHours[h.shiftPatternId]),
        datasets: [
          {
            data: hourlies.map(h =>
              metric === "1" ? h.absentism : h.efficiencyE1
            ),
            label: metric === "1" ? 'Absentism' : 'Efficiency E1',
            borderColor: 'rgba(0, 123, 255, 1)',   // plava linija
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // tačke / fill ispod linije (ako enabled)
            pointBackgroundColor: 'rgba(0, 123, 255, 1)', // boja tačaka
            pointBorderColor: 'rgba(0, 123, 255, 1)',
          }]
      }))
    );
    this.loading$ = this.store.select(HourliesSelectors.selectHourliesLoading);
    this.error$ = this.store.select(HourliesSelectors.selectHourliesError);

    this.teams$ = this.store.select(TeamsSelectors.selectTeamsWithAssignedLines);
    this.lines$ = this.store.select(LinesSelectors.selectLinesWithAssignedTeam);
  }
  onChange(event: MatRadioChange) {
    this.selectedMetric$.next(event.value);

  }
  filterHourlies(teamId: number) {

    this.selectedTeamId = teamId
    this.store.select(LinesSelectors.selectLineByTeamId(teamId)).pipe(
      take(1)
    ).subscribe(line => {
      if (line) {
        this.selectedShift = line.assignedShift!;
        this.selectedLineId = line.id

        this.store.dispatch(loadHourlies({
          teamId: teamId,
          assignedDate: new Date(line.assignedShiftDate!)
        }));
      }
    });

    // selectedShift$ = combineLatest([this.lines$, this.selectedTeamId$]).pipe(
    //   map(([lines, teamId]) => lines.find(line => line.assignedTeamId === teamId)?.assignedShift)
    // );
  }
  ngOnInit(): void {
    this.store.dispatch(TeamsActions.load());
    this.store.dispatch(LinesActions.load());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,       // minimum Y ose
        max: 100,     // maksimum Y ose
        ticks: {
          callback: function (value: number | string) {
            return value + '%'; // dodaje % znak
          },
          font: {
            size: 16   // veličina fonta za Y label-e
          }
        }
      },

    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16   // veličina fonta za legendu
          }
        }
      }
    }
  };
}
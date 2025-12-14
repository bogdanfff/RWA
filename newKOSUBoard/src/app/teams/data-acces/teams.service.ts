// team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/teams.model';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.baseUrl, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${team.id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

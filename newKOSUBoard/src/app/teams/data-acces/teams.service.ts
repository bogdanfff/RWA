import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Team } from "../models/teams.model";
import { BaseService } from "../../shared/services/base.service";

@Injectable({ providedIn: 'root' })
export class TeamsService extends BaseService<Team> {
  protected endpoint = 'Teams';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
}

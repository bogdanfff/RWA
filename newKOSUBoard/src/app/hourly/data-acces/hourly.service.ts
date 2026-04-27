import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/environment";
import { BaseService } from "../../shared/services/base.service"
import { Hourly } from "../models/hourlies.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HourliesService extends BaseService<Hourly> {
  protected endpoint = 'Hourly';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
  
 override list(teamId?: number, assignedDate?: Date): Observable<Hourly[]> {
  return this.http.get<Hourly[]>(`${this.baseUrl}/${this.endpoint}`, {
    params: {
      teamId: teamId!,
      assignedDate: assignedDate!.toISOString()
    }
  });
}
  
}

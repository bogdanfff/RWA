import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Line } from "../models/lines.model";
import { BaseService } from "../../shared/services/base.service";

@Injectable({ providedIn: 'root' })
export class LinesService extends BaseService<Line> {
  protected endpoint = 'Lines';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
  // assign(item: Partial<Line>) {
  //   const { id, ...updateData } = item
  //   this.http.patch(`/api/lines/${id}/assign`, {
  //     assignedTeamId: updateData.assignedTeam,
  //     assignedShift: updateData.assignedShift,
  //     assignedShiftDate: updateData.assignedShiftDate, // Date -> ISO string
  //     assignedTarget: updateData.assignedTarget,
  //     assignedEmployeesNo: updateData.assignedEmployeesNo
  //   })
  // }
}

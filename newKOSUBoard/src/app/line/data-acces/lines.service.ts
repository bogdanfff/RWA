import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/environment";
import { Line } from "../models/lines.model";
import { BaseService } from "../../shared/services/base.service";

@Injectable({ providedIn: 'root' })
export class LinesService extends BaseService<Line> {
  protected endpoint = 'Lines';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
}

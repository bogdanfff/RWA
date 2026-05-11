// segments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Segment } from '../models/segments.model';
import { BaseService } from '../../shared/services/base.service';

@Injectable({ providedIn: 'root' })
export class SegmentsService extends BaseService<Segment> {
  protected endpoint = 'Segments';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
}

// users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment';
import { User } from '../models/users.model';
import { BaseService } from '../../shared/services/base.service';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService<User> {
  protected endpoint = 'Users';

  constructor(http: HttpClient) {
    super(http, environment.baseUrl);
  }
}

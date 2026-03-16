// crud-http.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T extends { id: number | string }> {
  protected abstract endpoint: string;

  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  add(item: T): Observable<T> {
    console.log('zove se addx sa', item);
    
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item);
  }

  update(item: T & {id:number}): Observable<T> {
    const {id ,...updateData} = item
    return this.http.put<T>(
      `${this.baseUrl}/${this.endpoint}/${id}`,
      updateData
    );
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${this.endpoint}/${id}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_URL } from '../constants';
import { Users } from '@models/users';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  loadUsers$(): Observable<Users[]> {
    return this.http.get<Users[]>(BASE_URL);
    // return of([]);
  }
}

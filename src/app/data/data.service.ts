import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { merge, Subject } from 'rxjs';
import { concatMap, map, scan } from 'rxjs/operators';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private usersAPI$ = this.http.get<User[]>(BASE_URL);

  private userDeletedSubject = new Subject<User>();
  userDeleted$ = this.userDeletedSubject.asObservable();

  users$ = merge(
    this.usersAPI$,
    this.userDeleted$.pipe(
      concatMap((user: User) =>
        this.http.delete<User>(`${BASE_URL}/${user.id}`).pipe(map(() => user))
      )
    )
  ).pipe(scan((users, user) => this.filterUsers(<User[]>users, <User>user)));

  filterUsers(users: User[], user: User): User[] {
    return users.filter((u) => u.id !== user.id);
  }

  deleteUser(user: User): void {
    this.userDeletedSubject.next(user);
  }
}

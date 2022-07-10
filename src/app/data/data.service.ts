import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { merge, of, Subject, throwError } from 'rxjs';
import { catchError, concatMap, map, scan } from 'rxjs/operators';
import { BASE_URL, ERROR_API_DELETE, ERROR_API_GET } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private usersAPI$ = this.http
    .get<User[]>(BASE_URL)
    .pipe(catchError(() => throwError(() => ERROR_API_GET)));
  // visual test - simulate no users
  // private usersAPI$ = of([] as User[]);

  // subject/observable for indicating the user to be deleted
  private userDeletedSubject = new Subject<User>();
  userDeleted$ = this.userDeletedSubject.asObservable();

  // start with the api user response
  // merge the user delete subject/observable when emitted - triggers the api delete - return the user
  // use scan's accumulator aspect (users) to remove the user which then emits an updated users observable
  users$ = merge(
    this.usersAPI$,
    this.userDeleted$.pipe(
      concatMap((user: User) =>
        this.http.delete<User>(`${BASE_URL}/${user.id}`).pipe(map(() => user))
      ),
      catchError(() => throwError(() => ERROR_API_DELETE))
    )
  ).pipe(
    scan((users, user) => this.filterUsers(<User[]>users, <User>user)),
    catchError(() => throwError(() => ERROR_API_DELETE))
  );

  // remove the user from the users array
  filterUsers(users: User[], user: User): User[] {
    return users.filter((u) => u.id !== user.id);
  }

  // emit the user to be deleted
  deleteUser(user: User): void {
    this.userDeletedSubject.next(user);
  }
}

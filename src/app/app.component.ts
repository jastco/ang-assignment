import { Component, OnInit } from '@angular/core';
import { Users } from '@models/users';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { DataService } from './data/data.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users$: Observable<Users[]> | undefined;
  faTrash = faTrash;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.users$ = this.dataService.loadUsers$().pipe(
      tap((users) => {
        if (users?.length <= 0) {
          throw new Error('No users found');
        }
      }),
      catchError((err) => {
        console.log('Users API error: ', err);
        return EMPTY;
      })
    );
  }
}

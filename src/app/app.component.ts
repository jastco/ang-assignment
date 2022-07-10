import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { DataService } from './data/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  faTrash = faTrash;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.users$ = (<Observable<User[]>>this.dataService.users$).pipe(
      catchError((err) => {
        console.log('Users API error: ', err);
        return EMPTY;
      })
    );
  }

  deleteUser(user: User): void {
    confirm(`Delete information for ${user.name}?`) &&
      this.dataService.deleteUser(user);
  }
}

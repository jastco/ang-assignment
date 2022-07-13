import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  EMPTY,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { DataService } from './data/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  error$ = new BehaviorSubject<boolean | undefined>(undefined);
  users$: Observable<User[]> | undefined;
  filteredUsers$: Observable<User[]> | undefined;
  filter$: Observable<string> | undefined;

  search = new FormControl('');

  faTriangleExclamation = faTriangleExclamation;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.users$ = (<Observable<User[]>>this.dataService.users$).pipe(
      catchError((err) => {
        // console.log('Users API error: ', err);
        this.error$.next(true);
        return EMPTY;
      })
    );

    this.filter$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(250)
    );

    this.filteredUsers$ = combineLatest([this.users$, this.filter$]).pipe(
      map(([users, filter]) =>
        users.filter(
          (user) =>
            user.name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1
        )
      )
    );
  }

  refreshData(refresh: boolean): void {
    if (refresh) {
      window.location.reload();
    }
  }
}

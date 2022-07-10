import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
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
  }

  refreshData(refresh: boolean): void {
    if (refresh) {
      window.location.reload();
    }
  }
}

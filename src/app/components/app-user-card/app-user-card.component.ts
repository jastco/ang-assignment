import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user';
import { DataService } from 'app/data/data.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './app-user-card.component.html',
  styleUrls: ['./app-user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUserCardComponent implements OnInit {
  @Input() user: User | undefined;

  faTrash = faTrash;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  deleteUser(user: User): void {
    confirm(`Delete information for ${user.name}?`) &&
      this.dataService.deleteUser(user);
  }
}

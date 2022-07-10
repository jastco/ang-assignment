import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './app-top-nav.component.html',
  styleUrls: ['./app-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopNavComponent implements OnInit {
  @Output() refreshDataEvent = new EventEmitter<boolean>();

  collapsed = true;

  constructor() {}

  ngOnInit(): void {}

  refreshData(): void {
    this.refreshDataEvent.emit(true);
  }
}

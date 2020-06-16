import { Component, OnInit } from '@angular/core';
import { CalendarModel } from './models/calendar.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DateModel } from './models/date.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jobsity-calendar';
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  calendar$: Observable<any>;
  _days: Array<DateModel>;

  constructor(private store: Store<CalendarModel>) {
    this.calendar$ = this.store.pipe();
  }

  ngOnInit() {
    this.calendar$.subscribe((res) => {
      this._days = res.calendar.dates;
    });
  }

}

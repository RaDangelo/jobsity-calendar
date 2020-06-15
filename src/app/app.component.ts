import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jobsity-calendar';
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthDays = [...Array(32).keys()];
  days;

  constructor() {
    this.monthDays.shift();
    this.days = [30, 31, ...this.monthDays, 1, 2]
  }
  
}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { ReminderModel } from '../../models/reminder.model';
import { CalendarModel } from 'src/app/models/calendar.model';
import { Store } from '@ngrx/store';
import { Add, Edit, Remove } from 'src/app/actions/reminder.action';
import { DateModel } from 'src/app/models/date.model';

@Component({
  selector: 'day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent {

  _day: DateModel

  @Input() set day(val: DateModel) {
    if (val) {
      this._day = val;
    }
  };

  get day() {
    return this._day;
  }

  constructor(public dialog: MatDialog, private store: Store<CalendarModel>) {
  }

  addNewReminder() {
    let selectedDay = new Date();
    selectedDay.setDate(this.day.date.getDate());

    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      height: '500px',
      width: '250px',
      data: { date: selectedDay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.text) {
        this.store.dispatch(Add(result));
      }
    });
  }

  editReminder(event: Event, selectedReminder: ReminderModel) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      height: '500px',
      width: '250px',
      data: new ReminderModel(selectedReminder)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.text) {
        this.store.dispatch(Edit(result));
      }
    });

  }

  removeReminder(event: Event, index: number) {
    event.stopPropagation();
    this.removeReminders([index]);
  }

  removeReminders(indexes: number[]) {
    this.store.dispatch(Remove(indexes, this.day.date));
  }

}

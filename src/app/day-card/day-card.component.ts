import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { ReminderData } from '../model/reminder-data.model';

@Component({
  selector: 'day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent {

  @Input() day;

  reminders: Array<ReminderData>;
  currentDate = new Date();

  constructor(public dialog: MatDialog) {
    this.reminders = new Array<ReminderData>();
    this.reminders.push({ date: new Date(), time: '00:00', city: 'Sao Paulo', color: '#F2F2F2', text: 'Reuniao' });
  }

  addNewReminder() {
    let selectedDay = new Date();
    selectedDay.setDate(this.day);

    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      height: '500px',
      width: '250px',
      data: { date: selectedDay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.text) {
        this.reminders.push(result);
        this.sortReminders(this.reminders);
      }
    });
  }

  editReminder(selectedReminder: ReminderData) {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      height: '500px',
      width: '250px',
      data: selectedReminder
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.text) {
        selectedReminder = result;
        this.reminders = this.sortReminders(this.reminders);
      }
    });

  }

  sortReminders(reminders: Array<ReminderData>): Array<ReminderData> {
    return reminders.sort((a, b) => {
      const firstDate = new Date(0, 0, 0, parseInt(a.time.slice(0, 1)), parseInt(a.time.slice(3)));
      const secondDate = new Date(0, 0, 0, parseInt(b.time.slice(0, 1)), parseInt(b.time.slice(3)));
      return firstDate.getTime() - secondDate.getTime();
    });
  }

  removeReminders(indexes: number[]) {
    for (let i of indexes) {
      this.reminders = this.reminders.splice(i, 1);
    }
  }

}

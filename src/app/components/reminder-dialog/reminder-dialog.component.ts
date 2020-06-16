import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderModel } from '../../models/reminder.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css']
})
export class ReminderDialogComponent {

  timeErrorMessage = 'Please choose the time!';
  textErrorMessage = 'Please add a text!';
  isTimeValid = true;
  isTextValid = true;

  initialData: ReminderModel;
  weather: any = <any>{};

  constructor(public dialogRef: MatDialogRef<ReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReminderModel,
    private weatherService: WeatherService) {
    dialogRef.disableClose = true;

    this.initialData = new ReminderModel(data);
    if (this.initialData.city) {
      this.getWeather(this.initialData.city);
    }
  }

  saveReminder() {
    if (this.validateData()) {
      this.dialogRef.close(this.data);
    }
  }

  private validateData() {
    this.isTimeValid = this.data.time ? true : false;
    this.isTextValid = this.data.text && this.data.text.length < 31 ? true : false;

    return this.isTimeValid && this.isTextValid ? true : false;
  }

  closeDialog() {
    this.dialogRef.close(this.initialData);
  }

  getWeather(city: string) {
    if (city) {
      this.weatherService.getCurrentWeather(city)
        .subscribe(res => {
          this.weather = res;
        }, err => {
          if (err.error && err.error.message) {
            console.log(err.error.message);
            return;
          }
          console.log('Failed to get weather.');
        }, () => {
        })
    }
  }

}

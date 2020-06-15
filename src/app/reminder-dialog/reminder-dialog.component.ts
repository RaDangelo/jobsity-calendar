import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderData } from '../model/reminder-data.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css']
})
export class ReminderDialogComponent {

  initData: ReminderData;
  weather: any = <any>{};

  constructor(public dialogRef: MatDialogRef<ReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReminderData,
    private weatherService: WeatherService) {
    dialogRef.disableClose = true;

    this.initData = new ReminderData(data);
    if (this.initData.city) {
      this.getWeather(this.initData.city);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.initData);
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

  getBackgroundColor() {
    if (this.data) {
      return this.data.color ? this.data.color : '#F0F0F0';
    } else {
      return '#F0F0F0';
    }
  }

}

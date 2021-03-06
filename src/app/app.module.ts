import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayCardComponent } from './components/day-card/day-card.component';
import { ReminderDialogComponent } from './components/reminder-dialog/reminder-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { calendarReducer } from '../app/reducers/reminder.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DayCardComponent,
    ReminderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    StoreModule.forRoot({
      calendar: calendarReducer
    })
  ],
  entryComponents: [
    ReminderDialogComponent
  ],
  providers: [
    MatDatepickerModule,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

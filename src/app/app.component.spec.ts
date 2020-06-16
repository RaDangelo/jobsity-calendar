import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import * as actions from '../app/actions/reminder.action';
import * as reducer from '../app/reducers/reminder.reducer';
import { DateModel } from './models/date.model';
import { ReminderModel } from './models/reminder.model';
import { ActionModel } from './models/action.model';

describe('AppComponentTest', () => {
  afterEach(() => {
  });

  it('SHOULD return the default state', () => {
    const initialState = reducer.calendar;
    const state = reducer.calendarReducer(undefined, { type: null, payload: null });

    expect(state).toBe(initialState);
  });

  it('SHOULD create new white Reminder', () => {
    const initialState = reducer.calendar
    const currentDate = new Date();
    const payload: ReminderModel = {
      _id: 0,
      date: currentDate,
      city: 'Sao Paulo',
      color: '#F0F0F0',
      text: 'Meeting with Managers',
      time: '10:00'
    };
    const action = new ActionModel();
    action.type = actions.ActionTypes.Add;
    action.payload = payload;
    const state = reducer.calendarReducer(initialState, action);

    expect(state.dates.find(
      d => d.date.toLocaleDateString() === currentDate.toLocaleDateString()
    ).reminders.length).toEqual(1);
  });
});
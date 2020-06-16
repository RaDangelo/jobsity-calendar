import { ActionTypes } from '../actions/reminder.action';
import { ActionModel } from '../models/action.model';
import { CalendarModel } from '../models/calendar.model';
import { ReminderModel } from '../models/reminder.model';

import * as _ from 'lodash';

export const calendar = new CalendarModel();
var totalReminders: number = 0;

export function calendarReducer(state: CalendarModel = calendar, action: ActionModel) {
    let newState: CalendarModel;
    switch (action.type) {
        case ActionTypes.Add:
            {
                newState = _.cloneDeep(state);

                let newReminder = new ReminderModel(action.payload);
                newReminder._id = increaseRemindersCount();

                const dateIndex = newState.dates.findIndex(i => i.date.toLocaleDateString() ===
                    action.payload.date.toLocaleDateString());


                newState.dates[dateIndex].reminders.push(newReminder);
                newState.dates[dateIndex].reminders = sortReminders(newState.dates[dateIndex].reminders);

                return newState;
            };

        case ActionTypes.Edit:
            {
                newState = _.cloneDeep(state);

                const dateIndex = newState.dates.findIndex(i => i.date.toLocaleDateString() ===
                    action.payload.date.toLocaleDateString());
                const reminderIndex = newState.dates[dateIndex].reminders
                    .findIndex(r => r._id === action.payload._id);


                newState.dates[dateIndex].reminders[reminderIndex] = action.payload;
                newState.dates[dateIndex].reminders = sortReminders(newState.dates[dateIndex].reminders);

                return newState;
            }

        case ActionTypes.Remove:
            {
                newState = _.cloneDeep(state);

                const dateIndex = newState.dates.findIndex(i => i.date.toLocaleDateString() ===
                    action.payload.date.toLocaleDateString());

                for (let i of action.payload.indexes) {
                    newState.dates[dateIndex].reminders.splice(i, 1);
                }

                return newState;
            };

        default:
            return state;
    }
}

function increaseRemindersCount(): number {
    totalReminders = totalReminders + 1;
    return totalReminders;
}

function sortReminders(reminders: Array<ReminderModel>): Array<ReminderModel> {
    return reminders.sort((a, b) => {
        const firstDate = new Date(0, 0, 0, parseInt(a.time.slice(0, 1)), parseInt(a.time.slice(3)));
        const secondDate = new Date(0, 0, 0, parseInt(b.time.slice(0, 1)), parseInt(b.time.slice(3)));
        return firstDate.getTime() - secondDate.getTime();
    });
}


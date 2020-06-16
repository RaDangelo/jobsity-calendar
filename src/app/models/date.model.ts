import { ReminderModel } from './reminder.model';

export class DateModel {
    public date: Date;
    public reminders: Array<ReminderModel>;

    constructor(day?: number, month?: number, year?: number) {
        this.reminders = new Array<ReminderModel>();
        this.date = new Date();
        if (year) {
            this.date.setFullYear(year);
        }
        if (month) {
            this.date.setMonth(month);
        }
        if (day) {
            this.date.setDate(day);
        }
    }
}
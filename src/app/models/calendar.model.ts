import { DateModel } from './date.model';

const currentDate = new Date();

export class CalendarModel {
    public dates: Array<DateModel>;

    constructor() {
        this.dates = new Array<DateModel>();
        this.fillPreviousMonth();
        this.fillCurrentMonth();
        this.fillNextMonth();
    }


    // fill current month with empty reminders in the calendar
    private fillCurrentMonth() {
        for (let i = 1; i < 31; i++) {
            let newDate = new DateModel(i);
            this.dates.push(newDate);
        }
    }

    private fillPreviousMonth() {
        for (let i = 30; i < 32; i++) {
            let newDate = new DateModel(i, currentDate.getMonth() - 1);
            this.dates.push(newDate);
        }
    }

    private fillNextMonth() {
        for (let i = 1; i < 4; i++) {
            let newDate = new DateModel(i, currentDate.getMonth() + 1);
            this.dates.push(newDate);
        }
    }
}
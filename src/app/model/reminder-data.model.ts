export class ReminderData {
    date?: Date;
    time?: string;
    city?: string;
    color?: string;
    text?: string; // limited 30 chars

    constructor(data?: ReminderData) {
        this.date = data.date;
        this.time = data.time;
        this.city = data.city;
        this.color = data.color;
        this.text = data.text;
    }
}
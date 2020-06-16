export class ReminderModel {
    public _id: number = 0;
    public date?: Date;
    public time?: string;
    public city?: string;
    public color?: string;
    public text?: string; // limited 30 chars

    constructor(data?: ReminderModel) {
        if (data) {
            this._id = data._id;
            this.date = data.date;
            this.time = data.time;
            this.city = data.city;
            this.color = data.color;
            this.text = data.text;
        }
    }
}
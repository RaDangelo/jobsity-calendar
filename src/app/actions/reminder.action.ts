import { Action } from '@ngrx/store';
import { ReminderModel } from '../models/reminder.model';

export enum ActionTypes {
    Add = 'ADD',
    Edit = 'EDT',
    Remove = 'REM',
}

export const Add = (reminder: ReminderModel) => {
    return <Action>{ type: ActionTypes.Add, payload: reminder };
}

export const Edit = (reminder: ReminderModel) => {
    return <Action>{ type: ActionTypes.Edit, payload: reminder };
}

export const Remove = (indexes: number[], date: Date) => {
    return <Action>{ type: ActionTypes.Remove, payload: { indexes: indexes, date: date } };
}


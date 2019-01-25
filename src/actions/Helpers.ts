import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    SELECTION_STUDENT,
    SELECTION_EXERCISE
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
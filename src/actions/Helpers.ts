import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    GROUP_EVALUATION_ON_LOAD,
    PERFORMER_SELECTED,
    EXERCISE_SELECTED,
    NEXT,
    SAVE_EXERCISE_RESULT,
    SAVE_CRITERIA_RESULT,
    VISUALISATION_EVALUATIONS_ON_LOAD,
    SET_FILTER_EVALUATIONS_TYPE,
    SET_FILTER_EVALUATIONS_CONTAINING,
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
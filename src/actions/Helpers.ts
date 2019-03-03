import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    EVALUATE_GROUP_FETCH_ALL_BY_EVALUATION_ID_SUCCESS,
    PERFORMER_SELECTED,
    EXERCISE_SELECTED,
    NEXT,
    SAVE_EXERCISE_RESULT,
    SAVE_CRITERIA_RESULT,
    
    FETCH_EVALUATIONS_SUCCESS,
    SET_FILTER_EVALUATIONS_TYPE,
    SET_FILTER_EVALUATIONS_CONTAINING,
    
    GROUPS_EVALUATION,
    SAVE_NEW_EVALUATION,

    EXERCISE_RANK_SELECTED,
    SAVE_NEW_RANK,
    TYPE_EXERCISES,
    CRITERES_EXERCICE,
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
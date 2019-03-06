import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    EVALUATE_GROUP_ON_LOAD_SUCCESS,
    EVALUATE_GROUP_PERFORMER_SELECTED,
    EVALUATE_GROUP_EXERCISE_SELECTED,
    EVALUATE_GROUP_NEXT,
    EVALUATE_FIGHT_PREVIOUS_ROUND,
    EVALUATE_FIGHT_NEXT_ROUND,
    EVALUATIONS_LIST_ON_LOAD_SUCCESS,
    EVALUATIONS_LIST_SET_FILTER_TYPE,
    EVALUATIONS_LIST_SET_FILTER_CONTAINING,
    NEW_EVALUATION_ON_LOAD_SUCCESS,
    NEW_EVALUATION_SAVE_SUCCESS,
    RANKS_LIST_ON_LOAD_SUCCESS,
    NEW_RANK_SAVE_SUCCESS,
<<<<<<< HEAD
=======
    MEMBER_SPACE_ON_LOAD_SUCCESS,
    MEMBER_SPACE_SET_FILTER_TYPE,
    MEMBER_SPACE_SET_FILTER_CONTAINING,
>>>>>>> a1c613c... [REFACTOR] rename member space files

    EXERCISE_RANK_SELECTED,
    TYPE_EXERCISES,
    CRITERES_EXERCICE,
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
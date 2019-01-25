import {IAppAction,ActionType} from './Helpers';
import { match } from 'react-router';

export interface IGroupEvaluationProps{
    selectStudent: (id : number) => IAppAction;
    selectExercise: (id : number) => IAppAction;
    idStudent: number;
    idExercise: number;
    idEvaluation: number;
    match: match<any>;
}

export const selectStudent = (id : number) : IAppAction => {
    return {
        type: ActionType.SELECTION_STUDENT,
        payload: id
    };
};

export const selectExercise = (id : number) : IAppAction => {
    return {
        type: ActionType.SELECTION_EXERCISE,
        payload: id
    };
};



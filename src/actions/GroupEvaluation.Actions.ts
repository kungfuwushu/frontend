import {IAppAction,ActionType} from './Helpers';
import { match } from 'react-router';

export interface IGroupEvaluationProps{
    selectPerformer: (performer : any) => IAppAction;
    selectExercise: (exercise : any) => IAppAction;
    onLoad: (data : any) => IAppAction;
    next: () => IAppAction;
    
    selectedPerformer: any;
    selectedExercise: any;
    performers: any[];
    evaluation: any;
    match: match<any>;
}

export const selectPerformer = (performer : any) : IAppAction => {
    return {
        type: ActionType.PERFORMER_SELECTED,
        payload: performer
    };
};

export const selectExercise = (exercise : any) : IAppAction => {
    return {
        type: ActionType.EXERCISE_SELECTED,
        payload: exercise
    };
};

export const onLoad = (data : any) : IAppAction => {
    return {
        type: ActionType.GROUP_EVALUATION_ON_LOAD,
        payload: data
    };
};

export const next = () : IAppAction => {
    return {
        type: ActionType.NEXT
    };
};

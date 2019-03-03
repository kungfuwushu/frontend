import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { match } from 'react-router';
import { Evaluations, Members, RankExercises } from '../../api';

export interface IEvaluateGroupProps{
    selectPerformer: (performer : any) => IAppAction;
    selectExercise: (exercise : any) => IAppAction;
    onLoad: (evaluationId: number) => void;
    next: () => IAppAction;
    
    selectedPerformer: any;
    selectedExercise: any;
    performers: any[];
    evaluation: any;
    rankExercises: any[];
    match: match<any>;
}

export const selectPerformer = (performer : any) : IAppAction => {
    return {
        type: ActionType.EVALUATE_GROUP_PERFORMER_SELECTED,
        payload: performer
    };
};

export const selectExercise = (exercise : any) : IAppAction => {
    return {
        type: ActionType.EVALUATE_GROUP_EXERCISE_SELECTED,
        payload: exercise
    };
};

export const onLoad = (evaluationId: number) => (dispatch: Dispatch) => {
    Promise.all([
        Evaluations.byId(evaluationId),
        Members.byEvaluationId(evaluationId),
        RankExercises.byEvaluationId(evaluationId),
    ]).then(data =>
        dispatch(onLoadSuccess(data))
    );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.EVALUATE_GROUP_ON_LOAD_SUCCESS,
        payload: data
    };
};

export const next = () : IAppAction => {
    return {
        type: ActionType.EVALUATE_GROUP_NEXT
    };
};

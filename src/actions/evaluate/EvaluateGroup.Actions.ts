import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { match } from 'react-router';
import { Evaluations, Members, RankExercises } from '../../api';

export interface IEvaluateGroupProps{
    selectPerformer: (performer : any) => IAppAction;
    selectExercise: (exercise : any) => IAppAction;
    fetchAllByEvaluationId: (evaluationId: number) => void;
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

export const fetchAllByEvaluationId = (evaluationId: number) => (dispatch: Dispatch) => {
    Promise.all([
        Evaluations.byId(evaluationId),
        Members.byEvaluationId(evaluationId),
        RankExercises.byEvaluationId(evaluationId),
    ]).then(data =>
        dispatch(fetchAllByEvaluationIdSuccess(data))
    );
};

const fetchAllByEvaluationIdSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.EVALUATE_GROUP_FETCH_ALL_BY_EVALUATION_ID_SUCCESS,
        payload: data
    };
};

export const next = () : IAppAction => {
    return {
        type: ActionType.NEXT_PERFOMER_OR_EXERCISE
    };
};

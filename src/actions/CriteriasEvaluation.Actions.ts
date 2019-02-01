import {IAppAction, ActionType} from './Helpers';

export interface ICriteriasEvaluationProps{
    saveCriteriaResult: (criteriaResult: any) => IAppAction;
    
    rankCriterias: any[];
    rankExercise: any;
}

export const saveCriteriaResult = (criteriaResult : any) : IAppAction => {
    return {
        type: ActionType.SAVE_EXERCISE_RESULT,
        payload: criteriaResult
    };
};

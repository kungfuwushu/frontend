import {IAppAction, ActionType} from './Helpers';

export interface IExerciseEvaluationProps{
    saveExerciseResult: (exerciseResult: any) => IAppAction;
    
    performer: any;
    exercise: any;
    rankExercises: any;
}

export const saveExerciseResult = (exerciseResult : any) : IAppAction => {
    return {
        type: ActionType.SAVE_EXERCISE_RESULT,
        payload: exerciseResult
    };
};

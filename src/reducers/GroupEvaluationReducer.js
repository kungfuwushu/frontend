import { IAppAction, ActionType } from '../actions/Helpers';
import { Utility } from '../state/Utility';

const initialState = {
    idStudent: undefined,
    idExercise: undefined,
};

export const GroupEvaluationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SELECTION_STUDENT:
            return {...state, idStudent: action.payload};
        case ActionType.SELECTION_EXERCISE:
            return {...state, idExercise: action.payload};
        default:
            return state;
    }
};
import { ActionType } from '../actions/Helpers';

const initialState = {
    currentRoundIndex: 0,
};

export const EvaluateFightReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.NEXT_PERFOMER_OR_EXERCISE:
        case ActionType.PERFORMER_SELECTED:
        case ActionType.EXERCISE_SELECTED:
            return {
                ...state,
                currentRoundIndex: 0
            };
        case ActionType.PREVIOUS_ROUND:
            return {
                ...state,
                currentRoundIndex: state.currentRoundIndex - 1
            };
        case ActionType.NEXT_ROUND:
            return {
                ...state,
                currentRoundIndex: state.currentRoundIndex + 1
            };
        default:
            return state;
    }
};

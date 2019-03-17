import { ActionType } from '../actions/Helpers';

const initialState = {
    currentRoundIndex: 0,
};

export const EvaluateFightReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.EVALUATE_GROUP_NEXT:
        case ActionType.EVALUATE_GROUP_PERFORMER_SELECTED:
        case ActionType.EVALUATE_GROUP_EXERCISE_SELECTED:
            return {
                ...state,
                currentRoundIndex: 0
            };
        case ActionType.EVALUATE_FIGHT_PREVIOUS_ROUND:
            return {
                ...state,
                currentRoundIndex: state.currentRoundIndex - 1
            };
        case ActionType.EVALUATE_FIGHT_NEXT_ROUND:
            return {
                ...state,
                currentRoundIndex: state.currentRoundIndex + 1
            };
        default:
            return state;
    }
};

import { ActionType } from '../actions/Helpers';

const initialState = {
	evaluations: [],
	containingFilter: undefined,
	typeFilter: undefined,
};

export const VisualisationEvaluationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.VISUALISATION_EVALUATIONS_ON_LOAD:
            return {
                ...state,
                evaluations: action.payload
            };
		case ActionType.SET_FILTER_EVALUATIONS_CONTAINING:
			return {
				...state,
				containingFilter: action.payload
			};
		case ActionType.SET_FILTER_EVALUATIONS_TYPE:
			return {
				...state,
				typeFilter: action.payload
			};
        default:
            return state;
    }
};

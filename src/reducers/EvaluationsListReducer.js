import { ActionType } from '../actions/Helpers';

const initialState = {
	evaluations: [],
	containingFilter: undefined,
	typeFilter: undefined,
};

export const EvaluationsListReducer =(state = initialState, action)=>{
    switch (action.type) {
        case ActionType.NEW_EVALUATION_SAVE_SUCCESS:
            return {
                ...state,
                evaluations: state.evaluations.concat({...action.payload})
            };
        case ActionType.EVALUATIONS_LIST_ON_LOAD_SUCCESS:
            return {
                ...state,
                evaluations: action.payload
            };
		case ActionType.EVALUATIONS_LIST_SET_FILTER_CONTAINING:
			return {
				...state,
				containingFilter: action.payload
			};
		case ActionType.EVALUATIONS_LIST_SET_FILTER_TYPE:
			return {
				...state,
				typeFilter: action.payload
			};
        default:
            return state;
    }
}

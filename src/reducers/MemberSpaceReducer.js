import { ActionType } from '../actions/Helpers';

const initialState = {
	evaluations: [],
	member: undefined,
	typeFilter: undefined,
	containingFilter: undefined,
};

export const MemberSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.MEMBER_SPACE_ON_LOAD_SUCCESS:
            return {
                ...state,
				evaluations: action.payload[0],
				member: action.payload[1],
			};
		case ActionType.SET_FILTER_EVALUATIONS_TYPE:
			return {
				...state,
				typeFilter: action.payload
			};
		case ActionType.SET_FILTER_EVALUATIONS_CONTAINING:
			return {
				...state,
				containingFilter: action.payload
			};
        default:
            return state;
    }
};
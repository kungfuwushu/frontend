import { ActionType } from '../actions/Helpers';

const initialState = {
    exercises: [],
    containingFilter: undefined,
    typeFilter: undefined,
    visibleModal: false
};

export const ExerciseSelectionReducer =(state = initialState, action)=>{
    switch (action.type) {
        case ActionType.EXERCISE_SELECTION_OPEN_MODAL:
            return {
                ...state,
                visibleModal: true
            };
        case ActionType.EXERCISE_SELECTION_CLOSE_MODAL:
            return {
                ...state,
                visibleModal: false
            };
        case ActionType.EXERCISE_SELECTION_ON_LOAD_SUCCESS:
            return {
                ...state,
                exercises: action.payload
            };
		case ActionType.EXERCISE_SELECTION_SET_FILTER_CONTAINING:
			return {
				...state,
				containingFilter: action.payload
			};
		case ActionType.EXERCISE_SELECTION_SET_FILTER_TYPE:
			return {
				...state,
				typeFilter: action.payload
			};
        default:
            return state;
    }
}

import { ActionType } from './../actions/Helpers';

const initialState = {
	groups: [],
    saveSuccess: false,
    groupsContainingFilter: undefined,
};

export const NewEvaluationReducer =(state = initialState, action)=>{
    switch (action.type) {
        case ActionType.NEW_EVALUATION_ON_LOAD_SUCCESS:
            return {
                ...state,
                groups: action.payload
            };
        case ActionType.NEW_EVALUATION_SAVE_SUCCESS:
            return {
                ...state,
                saveSuccess: true
            };
        default:
            return state;
    }
}

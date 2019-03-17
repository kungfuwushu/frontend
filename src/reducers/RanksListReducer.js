import { ActionType } from '../actions/Helpers';

const initialState = {
	ranks: [],
	containingFilter: undefined,
	typeFilter: undefined,
};

export const RanksListReducer =(state = initialState, action)=>{
    switch (action.type) {
        case ActionType.NEW_RANK_SAVE_SUCCESS:
            return {
                ...state,
                ranks: state.evaluations.concat({...action.payload})
            };
        case ActionType.RANKS_LIST_ON_LOAD_SUCCESS:
            return {
                ...state,
                ranks: action.payload
            };
        default:
            return state;
    }
}

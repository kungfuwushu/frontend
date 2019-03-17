import { ActionType } from '../actions/Helpers';

const initialState = {
    ranks: [],
    typeFilter : undefined,
    exercicesfiltred : undefined,
}

export const NewRankReducer = (state, action) =>{
    switch (action.type){
        case ActionType.NEW_RANK_SAVE_SUCCESS:
            return { 
                ...state,
                ranks: [...state.ranks, action.value]
            }
        case ActionType.FETCH_EXERCISES:
            return {
                ...state,
                exercicesfiltred: action.payload
            }
        case ActionType.EXERCISE_RANK_SELECTED:
            return {
                ...state,
                typeFilter: action.payload
            }
        default:
            return initialState
    }
}

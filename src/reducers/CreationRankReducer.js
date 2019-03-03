import { ActionType } from '../actions/Helpers';

const initialState = {
    ranks: [],
    typeFilter : undefined,
    exercicesfiltred : undefined,
}

export const CreationRankReducer = (state, action) =>{
    let newstate
    switch (action.type){
        case ActionType.SAVE_NEW_RANK : 
        newstate = { 
            ...state,
             ranks: [...state.ranks, action.value]
        }
        return newstate

        case ActionType.FETCH_EXERCISES :
        return {
            ...state,
            exercicesfiltred: action.payload
        }

        case ActionType.EXERCISE_RANK_SELECTED :
        return {
            ...state,
            typeFilter: action.payload
        }

        default:
        return initialState
    }
}


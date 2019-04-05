import { ActionType } from '../actions/Helpers';

const initialState = {
    exercises: [],
};

export const NewRankReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.NEW_RANK_SAVE_SUCCESS:
            return state
        case ActionType.NEW_RANK_ADD_EXERCISES:
            return {
                ...state,
                exercises: state.exercises.concat(action.payload)
            }
        case ActionType.NEW_RANK_REMOVE_EXERCISE:
            const exerciseToRemove = action.payload;
            return {
                ...state,
                exercises: state.exercises.filter(exercise => exercise.id !== exerciseToRemove.id)
            }
        default:
            return state
    }
}

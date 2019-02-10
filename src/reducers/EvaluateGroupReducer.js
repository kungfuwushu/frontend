import { ActionType } from '../actions/Helpers';

const initialState = {
    performers: [],
    evaluation: undefined,
    rankExercises: [],
    rankCriterias: [],
    selectedPerformer: undefined,
    selectedExercise: undefined,
};

export const EvaluateGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.PERFORMER_SELECTED:
            return {
                ...state,
                selectedPerformer: action.payload
            };
        case ActionType.EXERCISE_SELECTED:
            return {
                ...state,
                selectedExercise: action.payload
            };
        case ActionType.EVALUATE_GROUP_FETCH_ALL_BY_EVALUATION_ID_SUCCESS: {
            const evaluation = action.payload[0];
            const performers = action.payload[1];
            return {
                ...state,
                evaluation,
                performers,
                rankExercises: action.payload[2],
                rankCriterias: action.payload[3],
                selectedExercise: evaluation.exercises.length > 0 ? evaluation.exercises[0] : undefined,
                selectedPerformer: performers.length > 0 ? performers[0] : undefined,
            };
        }
        case ActionType.NEXT: {
            const { performers, evaluation, selectedPerformer, selectedExercise } = state;
            const { exercises } = evaluation;
            if (performers.indexOf(selectedPerformer) !== performers.length - 1)
                return {
                    ...state,
                    selectedPerformer: performers[performers.indexOf(selectedPerformer) + 1],
                }
            return {
                ...state,
                selectedExercise: exercises[(exercises.indexOf(selectedExercise) + 1) % exercises.length],
                selectedPerformer: performers[0],
            }
        }
        default:
            return state;
    }
};

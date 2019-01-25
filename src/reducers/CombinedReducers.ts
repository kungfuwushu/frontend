import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { GroupEvaluationReducer } from './GroupEvaluationReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    groupEvaluation: GroupEvaluationReducer,
});
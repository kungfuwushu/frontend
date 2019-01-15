import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { GroupEvaluationReducer } from './GroupEvaluationReducer';
import { EvaluationsReducer } from './EvaluationsReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    groupEvaluation: GroupEvaluationReducer,
    evaluations : EvaluationsReducer,
});
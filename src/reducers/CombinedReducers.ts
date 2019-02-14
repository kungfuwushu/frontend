import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { EvaluateGroupReducer } from './EvaluateGroupReducer';
import { VisualisationEvaluationReducer } from './VisualisationEvaluationReducer';
import { EvaluationsReducer } from './EvaluationsReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    evaluateGroup: EvaluateGroupReducer,
    visualisationEvaluation: VisualisationEvaluationReducer,
    evaluations : EvaluationsReducer,
});
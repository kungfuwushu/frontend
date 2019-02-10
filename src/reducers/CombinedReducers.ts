import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { EvaluateGroupReducer } from './EvaluateGroupReducer';
import { VisualisationEvaluationReducer } from './VisualisationEvaluationReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    evaluateGroup: EvaluateGroupReducer,
    visualisationEvaluation: VisualisationEvaluationReducer,
});
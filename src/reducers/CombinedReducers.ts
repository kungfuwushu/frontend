import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { EvaluateGroupReducer } from './EvaluateGroupReducer';
import { EvaluateFightReducer } from './EvaluateFightReducer';
import { VisualisationEvaluationReducer } from './VisualisationEvaluationReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    evaluateGroup: EvaluateGroupReducer,
    evaluateFight: EvaluateFightReducer,
    visualisationEvaluation: VisualisationEvaluationReducer,
});
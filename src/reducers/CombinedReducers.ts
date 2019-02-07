import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { GroupEvaluationReducer } from './GroupEvaluationReducer';
import { VisualisationEvaluationReducer } from './VisualisationEvaluationReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    groupEvaluation: GroupEvaluationReducer,
    visualisationEvaluation: VisualisationEvaluationReducer,
});
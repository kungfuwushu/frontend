import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { EvaluateGroupReducer } from './EvaluateGroupReducer';
import { EvaluateFightReducer } from './EvaluateFightReducer';
import { EvaluationsListReducer } from './EvaluationsListReducer';
import { NewEvaluationReducer } from './NewEvaluationReducer';
import { RanksListReducer } from './RanksListReducer';
import { NewRankReducer } from './NewRankReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    evaluateGroup: EvaluateGroupReducer,
    evaluateFight: EvaluateFightReducer,
    evaluationsList : EvaluationsListReducer,
    newEvaluation: NewEvaluationReducer,
    ranksList: RanksListReducer,
    newRankList: NewRankReducer,
});

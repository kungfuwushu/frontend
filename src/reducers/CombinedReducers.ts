import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import {AuthenticationReducer} from "./AuthenticationReducer";
import { rootReducer as usersReducers } from "../data/users";
import { EvaluateGroupReducer } from './EvaluateGroupReducer';
import { EvaluateFightReducer } from './EvaluateFightReducer';
import { EvaluationsListReducer } from './EvaluationsListReducer';
import { NewEvaluationReducer } from './NewEvaluationReducer';
import { RanksListReducer } from './RanksListReducer';
import { NewRankReducer } from './NewRankReducer';
import { MemberSpaceReducer } from './MemberSpaceReducer';
import { ExerciseSelectionReducer } from './ExerciseSelectionReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: usersReducers,
    evaluateGroup: EvaluateGroupReducer,
    evaluateFight: EvaluateFightReducer,
    evaluationsList : EvaluationsListReducer,
    newEvaluation: NewEvaluationReducer,
    ranksList: RanksListReducer,
    newRank: NewRankReducer,
    exerciseSelection: ExerciseSelectionReducer,
    memberSpace: MemberSpaceReducer,
});

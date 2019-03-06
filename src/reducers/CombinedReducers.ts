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
<<<<<<< HEAD
=======
import { MemberSpaceReducer } from './MemberSpaceReducer';
>>>>>>> a1c613c... [REFACTOR] rename member space files

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: usersReducers,
    evaluateGroup: EvaluateGroupReducer,
    evaluateFight: EvaluateFightReducer,
    evaluationsList : EvaluationsListReducer,
    newEvaluation: NewEvaluationReducer,
    ranksList: RanksListReducer,
    newRankList: NewRankReducer,
<<<<<<< HEAD
});
=======
    memberSpace: MemberSpaceReducer,
});
>>>>>>> a1c613c... [REFACTOR] rename member space files

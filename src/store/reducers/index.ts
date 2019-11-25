import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { UserReducer } from "./UserReducer";
// import { rootReducer as usersReducer } from "../data/users";

export const reducers = combineReducers({
    utility: UtilityReducer,
    user: UserReducer,
    // users: usersReducer,
});

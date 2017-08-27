import {combineReducers} from "redux";
import {teams} from "./teams";
import {user} from "./user";

const data = combineReducers({
    teams,
});

const rootReducer = combineReducers({
    user,
    data
});

export default rootReducer
import combineReducers from "redux/src/combineReducers";
import {teams} from "./teams";
import {players} from "./players";

export const data = combineReducers({
    teams,
    players,
});
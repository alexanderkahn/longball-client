import combineReducers from "redux/src/combineReducers";
import {teams} from "./teams";
import {players} from "./players";
import {leagues} from "./leagues";

export const data = combineReducers({
    leagues,
    teams,
    players,
});
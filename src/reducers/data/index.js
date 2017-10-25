import combineReducers from "redux/src/combineReducers";
import {teams} from "./teams";
import {people} from "./people"
import {rosterPositions} from "./rosterPositions";
import {leagues} from "./leagues";

export const data = combineReducers({
    leagues,
    teams,
    people,
    rosterPositions,
});
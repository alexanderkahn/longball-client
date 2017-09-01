import combineReducers from "redux/src/combineReducers";
import {manageTeams} from "./manageTeams";
import {managePlayers} from "./managePlayers";
import {teamDetail} from "./teamDetail";
import {playerDetail} from "./playerDetail";

export const views = combineReducers({
    manageTeams,
    managePlayers,
    teamDetail,
    playerDetail,
});
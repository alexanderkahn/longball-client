import combineReducers from "redux/src/combineReducers";
import {manageTeams} from "./manageTeams";
import {managePlayers} from "./managePlayers";
import {teamDetail} from "./teamDetail";

export const views = combineReducers({
    manageTeams,
    managePlayers,
    teamDetail
});
import combineReducers from "redux/src/combineReducers";
import {manageTeams} from "./manageTeams";
import {managePlayers} from "./managePlayers";
import {teamDetail} from "./teamDetail";
import {playerDetail} from "./playerDetail";
import {leagueDetail} from "./leagueDetail";
import {manageLeagues} from "./manageLeagues";

export const views = combineReducers({
    manageLeagues,
    manageTeams,
    managePlayers,
    leagueDetail,
    teamDetail,
    playerDetail,
});
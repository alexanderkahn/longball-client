import combineReducers from "redux/src/combineReducers";
import {manageTeams} from "./manageTeams";
import {managePlayers} from "./managePlayers";

export const routes = combineReducers({
    manageTeams,
    managePlayers,
});
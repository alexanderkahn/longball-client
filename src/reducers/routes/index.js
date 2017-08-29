import combineReducers from "redux/src/combineReducers";
import {manageTeams} from "./manageTeams";

export const routes = combineReducers({
    manageTeams,
});
import {auth} from "./auth";
import {data} from "./data/index";
import {views} from "./views/index";
import {combineReducers} from "redux";

const reducers = combineReducers({
    auth,
    data,
    views,
});

export default reducers
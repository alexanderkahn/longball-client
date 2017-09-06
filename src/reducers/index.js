import {auth} from "./auth";
import {data} from "./data/index";
import {views} from "./views/index";
import {combineReducers} from "redux";
import {easterEgg} from "./easterEgg";

const reducers = combineReducers({
    auth,
    data,
    views,
    easterEgg,
});

export default reducers
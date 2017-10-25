import {auth} from "./auth";
import {data} from "./data/index";
import {currentView} from "./views/index";
import {combineReducers} from "redux";
import {easterEgg} from "./easterEgg";

const reducers = combineReducers({
    auth,
    data,
    currentView,
    easterEgg,
});

export default reducers
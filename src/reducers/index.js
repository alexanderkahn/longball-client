import {combineReducers} from "redux";
import {user} from "./user";
import {data} from "./data/index";
import {routes} from "./routes/index";

const rootReducer = combineReducers({
    user,
    data,
    routes,
});

export default rootReducer
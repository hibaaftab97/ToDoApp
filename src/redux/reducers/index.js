import { combineReducers } from "redux";
import CreateTaskReducer from "./CreateTaskReducer";
import AuthReducer from "./AuthReducer";

const reducer = combineReducers({
    create: CreateTaskReducer,
    auth: AuthReducer 
});

export default reducer;

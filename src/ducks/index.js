import { combineReducers } from "redux"
import maps from "./reducers/maps"
import users from "./reducers/users.jsx"


export default combineReducers({
    maps,
    users
})
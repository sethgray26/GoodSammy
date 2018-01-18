import { combineReducers } from "redux"
import maps from "./reducers/maps"
import users from "./reducers/users.jsx"
import requests from "./reducers/requests"

export default combineReducers({
    maps,
    requests,
    users
})
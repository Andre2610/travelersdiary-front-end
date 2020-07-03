import { combineReducers } from "redux";
import trips from "./trips/reducer";
import users from "./users/reducer";

export default combineReducers({
  trips,
  users,
});

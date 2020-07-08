import { combineReducers } from "redux";
import trips from "./trips/reducer";
import users from "./users/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  trips,
  users,
  appState,
});

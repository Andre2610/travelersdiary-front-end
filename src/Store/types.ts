import { AppState } from "../Types/appStateTypes";
import { User } from "../Types/userTypes";
import { Trip } from "../Types/tripTypes";
import { TripActionTypes } from "./trips/types";
import { UserActionTypes } from "./users/types";
import { AppStateActionTypes } from "./appState/types";

export type StoreState = {
  users: User;
  trips: Trip[];
  appState: AppState;
};

export type GetState = () => StoreState;

export type AppActions =
  | TripActionTypes
  | UserActionTypes
  | AppStateActionTypes;

import {
  Trip,
  Post,
  User,
  NoTokenUser,
  AppState,
  Message,
} from "../../Types/model";

export const FETCH_TRIPS = "FETCH_TRIPS";
export const FETCH_SINGLE_TRIP = "FETCH_SINGLE_TRIP";
export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";
export const FETCH_USER = "FETCH_USER";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ADD_USER_TRIP = "ADD_USER_TRIP";
export const UPDATE_USER_TRIPS = "UPDATE_USER_TRIPS";
export const UPDATE_USER_POSTS = "UPDATE_USER_POSTS";
export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export type StoreState = {
  users: User;
  trips: Trip[];
  appState: AppState;
};

export type GetState = () => StoreState;

export type loadInitialTrips = {
  type: typeof FETCH_TRIPS;
  trips: Trip[];
};
export type fetchSingleTrip = {
  type: typeof FETCH_SINGLE_TRIP;
  trips: Trip[];
};
// export type loadMoreTrips = {
//   type: typeof FETCH_MORE_TRIPS;
//   trips: Trip[];
// };

export type fetchUser = {
  type: typeof FETCH_USER;
  user: User;
};
export type fetchNoTokenUser = {
  type: typeof TOKEN_STILL_VALID;
  noTokenUser: NoTokenUser;
};
export type logOut = {
  type: typeof LOG_OUT;
};
export type addnewtrip = {
  type: typeof ADD_USER_TRIP;
  trip: Trip;
};
export type updateUserTrip = {
  type: typeof UPDATE_USER_TRIPS;
  trip: Trip;
};
export type updateUserPosts = {
  type: typeof UPDATE_USER_POSTS;
  post: Post;
};

export type appLoading = {
  type: typeof APP_LOADING;
};
export type appDoneLoading = {
  type: typeof APP_DONE_LOADING;
};
export type setMessage = {
  type: typeof SET_MESSAGE;
  message: Message;
};
export type clearMessage = {
  type: typeof CLEAR_MESSAGE;
};

export type showMessageWithTimeout = (
  variant: string,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number
) => void;

export type TripActionTypes = loadInitialTrips | fetchSingleTrip;
export type UserActionTypes =
  | fetchUser
  | fetchNoTokenUser
  | logOut
  | addnewtrip
  | updateUserTrip
  | updateUserPosts;
export type AppStateActionTypes =
  | appLoading
  | appDoneLoading
  | setMessage
  | clearMessage;

export type AppActions =
  | TripActionTypes
  | UserActionTypes
  | AppStateActionTypes;

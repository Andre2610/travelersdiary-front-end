import { Trip, Post, User, NoTokenUser, AppState } from "../../Types/model";

export const FETCH_TRIPS = "FETCH_TRIPS";
export const FETCH_SINGLE_TRIP = "FETCH_SINGLE_TRIP";
export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";
export const FETCH_USER = "FETCH_USER";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
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
export type updateUserTrips = {
  type: typeof UPDATE_USER_TRIPS;
  trip: Trip;
};
export type updateUserPosts = {
  type: typeof UPDATE_USER_POSTS;
  post: Post;
};

export type appLoading = {
  type: typeof APP_LOADING;
  message: null;
};
export type appDoneLoading = {
  type: typeof APP_DONE_LOADING;
  message: null;
};
export type setMessage = {
  type: typeof SET_MESSAGE;
  message: string;
};
export type clearMessage = {
  type: typeof CLEAR_MESSAGE;
  message: null;
};

export type TripActionTypes = loadInitialTrips | fetchSingleTrip;
export type UserActionTypes =
  | fetchUser
  | fetchNoTokenUser
  | logOut
  | updateUserTrips
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

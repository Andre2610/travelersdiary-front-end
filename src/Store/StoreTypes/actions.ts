import { Trip, Post, Picture, User, NoTokenUser } from "../../Types/model";

export const FETCH_TRIPS = "FETCH_TRIPS";
export const FETCH_SINGLE_TRIP = "FETCH_SINGLE_TRIP";
export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";
export const FETCH_USER = "FETCH_USER";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

export type StoreState = {
  users: User;
  trips: Trip[];
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
export type loadMoreTrips = {
  type: typeof FETCH_MORE_TRIPS;
  trips: Trip[];
};

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

export type TripActionTypes = loadInitialTrips | fetchSingleTrip;
export type UserActionTypes = fetchUser | fetchNoTokenUser | logOut;

export type AppActions = TripActionTypes | UserActionTypes;

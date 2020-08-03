import { Trip, Post } from "../../Types/tripTypes";
import { User } from "../../Types/userTypes";

export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";
export const FETCH_USER = "FETCH_USER";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ADD_USER_TRIP = "ADD_USER_TRIP";
export const UPDATE_USER_TRIPS = "UPDATE_USER_TRIPS";
export const UPDATE_USER_POSTS = "UPDATE_USER_POSTS";

export type fetchUser = {
  type: typeof FETCH_USER;
  user: User;
};
export type fetchNoTokenUser = {
  type: typeof TOKEN_STILL_VALID;
  user: User;
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

export type UserActionTypes =
  | fetchUser
  | fetchNoTokenUser
  | logOut
  | addnewtrip
  | updateUserTrip
  | updateUserPosts;

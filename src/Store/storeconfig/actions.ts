import { Trip, Post, Picture } from "../../model";

export const FETCH_TRIPS = "FETCH_TRIPS";
export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";

export type loadInitialTrips = {
  type: typeof FETCH_TRIPS;
  trips: Trip[];
};
export type loadMoreTrips = {
  type: typeof FETCH_MORE_TRIPS;
  trips: Trip[];
};

export type TripActionTypes = loadInitialTrips | loadMoreTrips;

export type AppActions = TripActionTypes;

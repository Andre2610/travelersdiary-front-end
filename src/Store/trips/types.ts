import { Trip } from "../../Types/tripTypes";

export const FETCH_TRIPS = "FETCH_TRIPS";
export const FETCH_SINGLE_TRIP = "FETCH_SINGLE_TRIP";
export const FETCH_MORE_TRIPS = "FETCH_MORE_TRIPS";

export type loadInitialTrips = {
  type: typeof FETCH_TRIPS;
  trips: Trip[];
};
export type fetchSingleTrip = {
  type: typeof FETCH_SINGLE_TRIP;
  trips: Trip[];
};

export type TripActionTypes = loadInitialTrips | fetchSingleTrip;

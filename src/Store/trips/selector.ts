import { Trip } from "../../Types/tripTypes";
import { StoreState } from "../types";

export const selectAllTrips = (state: StoreState) => {
  return state.trips;
};

export const selectIdTrip = (id: string) => {
  return (state: any) => {
    return state.trips.find((trip: Trip) => {
      return trip.id === parseInt(id);
    });
  };
};

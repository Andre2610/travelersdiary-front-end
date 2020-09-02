import { StoreState } from "../types";
import { Trip } from "../../Types/tripTypes";

export const selectToken = (state: StoreState) => state.users.token;

export const selectUser = (state: StoreState) => state.users;

export const selectUserTrip = (id: string) => {
  return (state: StoreState) => {
    return state.users.trips.find((trip: Trip) => {
      return trip.id === parseInt(id);
    });
  };
};

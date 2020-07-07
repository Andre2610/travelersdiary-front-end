import { StoreState } from "../StoreTypes/actions";
import { Trip } from "../../Types/model";

export const selectToken = (state: StoreState) => state.users.token;

export const selectUser = (state: StoreState) => state.users;

export const selectUserTrip = (id: string) => {
  return (state: any) => {
    return state.users.trips.find((trip: Trip) => {
      return trip.id === parseInt(id);
    });
  };
};

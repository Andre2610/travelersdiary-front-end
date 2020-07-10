import { Trip } from "../../Types/model";
import { StoreState } from "../StoreTypes/actions";

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

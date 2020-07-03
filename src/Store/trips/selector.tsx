import { Trip } from "../../Types/model";
import { StoreState } from "../StoreTypes/actions";

export const selectAllTrips = (state: StoreState) => {
  // console.log("my state", state);
  return state.trips;
};

export const selectIdTrip = (id: string) => {
  return (state: any) => {
    return state.trips.find((trip: Trip) => {
      // console.log(`does ${trip.id} match ${id}`, trip.id === parseInt(id));
      return trip.id === parseInt(id);
    });
  };
};

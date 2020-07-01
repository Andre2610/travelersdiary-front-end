import { Trip } from "../../Types/model";

export const selectAllTrips = (state: any) => {
  console.log("my state", state);
  return state.trips;
};

export const selectIdTrip = (id: string) => {
  console.log("typeof id", typeof id);
  return (state: any) => {
    return state.trips.find((trip: Trip) => {
      console.log("do I get here?");
      console.log(`does ${trip.id} match ${id}`, trip.id === parseInt(id));
      return trip.id === parseInt(id);
    });
  };
};

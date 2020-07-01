import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../../config/constants";
import { AppActions, FETCH_TRIPS } from "../storeconfig/actions";
import { Trip } from "../../model";

export const allTripsFetched = (trips: Trip[]): AppActions => ({
  type: FETCH_TRIPS,
  trips,
});

export function fetchTrips() {
  return async function thunk(dispatch: any, getState: any) {
    try {
      const res = await axios.get(`${apiUrl}/trips`);
      console.log("What is my response inside actions", res.data);
      dispatch(allTripsFetched(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

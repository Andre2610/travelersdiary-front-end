import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../../config/constants";
import {
  AppActions,
  FETCH_TRIPS,
  FETCH_SINGLE_TRIP,
} from "../StoreTypes/actions";
import { Trip, GetState } from "../../Types/model";

export const allTripsFetched = (trips: Trip[]): AppActions => ({
  type: FETCH_TRIPS,
  trips,
});
export const fetchOneTrip = (trips: Trip[]): AppActions => ({
  type: FETCH_SINGLE_TRIP,
  trips,
});

export function fetchTrips() {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      const res = await axios.get(`${apiUrl}/trips`);
      // console.log("What is my response inside actions", res.data);
      dispatch(allTripsFetched(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function fetchSpecificTrip(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      const res = await axios.get(`${apiUrl}/trips/${id}`);
      // console.log("What is my response", res.data);
      dispatch(fetchOneTrip(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

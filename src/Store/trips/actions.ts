import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../../config/constants";
import { TripActionTypes, FETCH_TRIPS, FETCH_SINGLE_TRIP } from "./types";
import { AppActions, GetState } from "../types";
import { Trip } from "../../Types/tripTypes";
import { setMessage, appDoneLoading, appLoading } from "../appState/actions";

export const allTripsFetched = (trips: Trip[]): TripActionTypes => ({
  type: FETCH_TRIPS,
  trips,
});
export const fetchOneTrip = (trips: Trip[]): TripActionTypes => ({
  type: FETCH_SINGLE_TRIP,
  trips,
});

export function fetchTrips() {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      dispatch(appLoading());
      const res = await axios.get(`${apiUrl}/trips`);
      // console.log("What is my response inside actions", res.data);
      dispatch(allTripsFetched(res.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("error", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("error", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
}

export function fetchSpecificTrip(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      dispatch(appLoading());
      const res = await axios.get(`${apiUrl}/trips/${id}`);
      dispatch(fetchOneTrip(res.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("error", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("error", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
}

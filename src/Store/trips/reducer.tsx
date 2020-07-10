import { Trip } from "../../Types/model";
import {
  TripActionTypes,
  FETCH_TRIPS,
  FETCH_SINGLE_TRIP,
} from "../StoreTypes/actions";

const initialState: Trip[] = [];

export default (state = initialState, action: TripActionTypes) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return [...action.trips];
    case FETCH_SINGLE_TRIP:
      return [action.trips];
    default:
      return state;
  }
};

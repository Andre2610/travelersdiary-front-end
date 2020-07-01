import { Trip } from "../../model";
import { TripActionTypes, FETCH_TRIPS } from "../storeconfig/actions";

const initialState: Trip[] = [];

export default (state = initialState, action: TripActionTypes) => {
  switch (action.type) {
    case FETCH_TRIPS:
      // console.log("do I get here?");
      return [...action.trips];
    default:
      return state;
  }
};

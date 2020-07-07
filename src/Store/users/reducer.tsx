import { User } from "../../Types/model";
import {
  UserActionTypes,
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
  UPDATE_USER_TRIPS,
  UPDATE_USER_POSTS,
} from "../StoreTypes/actions";

const token = localStorage.getItem("token");

const initialState: User = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  token: token,
  title: null,
  about: null,
  trips: [],
};

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case FETCH_USER:
      const userToken = action.user.token;
      if (userToken) localStorage.setItem("token", userToken);
      return { ...state, ...action.user };
    case TOKEN_STILL_VALID:
      return { ...state, ...action.noTokenUser };
    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case UPDATE_USER_TRIPS:
      return { ...state, trips: [...state.trips, { ...action.trip }] };
    case UPDATE_USER_POSTS:
      const updateTrips = state.trips.map((trip) => {
        // console.log(
        //   `does ${trip.id} match ${action.post.tripId}`,
        //   trip.id === action.post.tripId
        // );
        if (trip.id === action.post.tripId) {
          console.log("do I get here?");
          return { ...trip, posts: [...trip.posts, { ...action.post }] };
        }
        return trip;
      });
      console.log("my previous trips", state.trips);
      console.log("my updateTrips", updateTrips);
      // console.log("my payload", action.post);
      // console.log("my state", state);
      return { ...state, trips: [...updateTrips] };
    default:
      return state;
  }
};

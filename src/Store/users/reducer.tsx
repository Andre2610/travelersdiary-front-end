import { User } from "../../Types/model";
import {
  UserActionTypes,
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
  UPDATE_USER_TRIPS,
  UPDATE_USER_POSTS,
  ADD_USER_TRIP,
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
  verified: false,
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
    case ADD_USER_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.trip],
      };
    case UPDATE_USER_TRIPS:
      const updatedTrips = state.trips.map((trip) => {
        if (trip.id === action.trip.id) {
          return action.trip;
        }
        return trip;
      });
      return { ...state, trips: updatedTrips };
    case UPDATE_USER_POSTS:
      const updateTrips = state.trips.map((trip) => {
        if (trip.id === action.post.tripId) {
          return { ...trip, posts: [...trip.posts, { ...action.post }] };
        }
        return trip;
      });
      return { ...state, trips: [...updateTrips] };
    default:
      return state;
  }
};

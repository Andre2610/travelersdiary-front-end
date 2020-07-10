import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl, cloudinaryUrl } from "../../config/constants";
import {
  AppActions,
  GetState,
  FETCH_TRIPS,
  FETCH_SINGLE_TRIP,
  UPDATE_USER_TRIPS,
  UPDATE_USER_POSTS,
  ADD_USER_TRIP,
} from "../StoreTypes/actions";
import { Trip, TripDetails, NewPost, Post } from "../../Types/model";
import {
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
  appLoading,
} from "../appState/actions";

export const allTripsFetched = (trips: Trip[]): AppActions => ({
  type: FETCH_TRIPS,
  trips,
});
export const fetchOneTrip = (trips: Trip[]): AppActions => ({
  type: FETCH_SINGLE_TRIP,
  trips,
});

export const addUserTrip = (trip: Trip): AppActions => ({
  type: ADD_USER_TRIP,
  trip,
});
export const updateUserTrips = (trip: Trip): AppActions => ({
  type: UPDATE_USER_TRIPS,
  trip,
});

export const updateUserPosts = (post: Post): AppActions => ({
  type: UPDATE_USER_POSTS,
  post,
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

// Create new trip
export function createNewTrip(tripDetails: TripDetails) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const userId = getState().users.id;
    const token = getState().users.token;
    const data = { ...tripDetails, userId };
    try {
      dispatch(appLoading());
      const res = await axios.post(
        `${apiUrl}/trips/newtrip`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addUserTrip(res.data));
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

// end trip
export function endTrip(data: Trip) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const token = getState().users.token;
    console.log("endtrip data", data);
    console.log(`the endpoint: ${apiUrl}/trips/endtrip/${data.id}`);
    try {
      dispatch(appLoading());
      const res = await axios.patch(
        `${apiUrl}/trips/endtrip/${data.id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("my res", res.data);
      dispatch(updateUserTrips(res.data));
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

// Create new post
export function createNewPost(newPost: NewPost, images: any) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const token = getState().users.token;
    const { latitude, longitude, title, content, tripId } = newPost;

    const data = {
      latitude,
      longitude,
      title,
      content,
      tripId,
      pictures: [...images],
    };
    try {
      dispatch(appLoading());
      const res = await axios.post(
        `${apiUrl}/trips/newpost`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateUserPosts(res.data));
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

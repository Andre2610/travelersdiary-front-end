import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl, cloudinaryUrl } from "../../config/constants";
import {
  AppActions,
  GetState,
  FETCH_TRIPS,
  FETCH_SINGLE_TRIP,
  UPDATE_USER_TRIPS,
} from "../StoreTypes/actions";
import { Trip, TripDetails, NewPost } from "../../Types/model";

export const allTripsFetched = (trips: Trip[]): AppActions => ({
  type: FETCH_TRIPS,
  trips,
});
export const fetchOneTrip = (trips: Trip[]): AppActions => ({
  type: FETCH_SINGLE_TRIP,
  trips,
});

export const updateUserTrips = (trip: Trip): AppActions => ({
  type: UPDATE_USER_TRIPS,
  trip,
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

// Create new trip
export function createNewTrip(tripDetails: TripDetails) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const userId = getState().users.id;
    const token = getState().users.token;
    const data = { ...tripDetails, userId };
    try {
      const res = await axios.post(
        `${apiUrl}/trips/newtrip`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("new trip res", res.data);
      dispatch(updateUserTrips(res.data));
    } catch (e) {
      console.log(e.message);
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
      const res = await axios.patch(
        `${apiUrl}/trips/endtrip/${data.id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("trip ended?", res.data);
      dispatch(fetchOneTrip(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

// Create new post
export function createNewPost(newPost: NewPost) {
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const token = getState().users.token;
    const { latitude, longitude, title, content, tripId } = newPost;
    const pictures = newPost.pictures;
    console.log("my pictures", pictures);
    const data = {
      latitude,
      longitude,
      title,
      content,
      tripId,
      pictures: [...pictures],
    };
    try {
      const postRes = await axios.post(
        `${apiUrl}/trips/newpost`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const picturesUrl = pictures.map(async (picture) => {
      //   await axios.post(`${cloudinaryUrl}`, { picture });
      // });
      // await Promise.all(picturesUrl);
      // console.log("whats in here,", picturesUrl);
      console.log("new trip res", postRes.data);
      // dispatch(updateUserTrips(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

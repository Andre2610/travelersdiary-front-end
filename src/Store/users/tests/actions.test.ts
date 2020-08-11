import {
  userFetched,
  tokenStillValid,
  addUserTrip,
  updateUserTrips,
  updateUserPosts,
  logOut,
  login,
  signUp,
  getUserWithStoredToken,
  createNewTrip,
  endTrip,
  createNewPost,
} from "../actions";
import {
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
  ADD_USER_TRIP,
  UPDATE_USER_POSTS,
  UPDATE_USER_TRIPS,
} from "../types";
import { Trip, Post, NewPost, TripDetails } from "../../../Types/tripTypes";
import { User, Credentials, SignupData } from "../../../Types/userTypes";
import axios from "../../axios";
import { AppActions, GetState } from "../../types";

const user: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "test@test.com",
  token: "token",
  title: "Test title",
  about: "Test about",
  trips: [],
  verified: true,
};

describe("test userFetched and log out", () => {
  describe("if given an object with user info", () => {
    test("should return an object containing payload user info and type FETCH_USER", () => {
      const expected = {
        type: FETCH_USER,
        user,
      };
      expect(userFetched(user)).toEqual(expected);
    });
  });

  describe("if logOut is called", () => {
    test("should return a payload object with null payload and type LOG_OUT", () => {
      const expected = {
        type: LOG_OUT,
      };
      expect(logOut()).toEqual(expected);
    });
  });
  describe("if given an object of user info", () => {
    test("should return an object containing payload user info and type TOKEN_STILL_VALID", () => {
      const expected = {
        type: TOKEN_STILL_VALID,
        user,
      };
      expect(tokenStillValid(user)).toEqual(expected);

      //   test("payload should be the same as user object passed for still logged in", () => {
      //     const expected = {
      //       type: "TOKEN_STILL_VALID",
      //       payload: user,
      //     };
      //     expect(tokenStillValid(user).payload).toEqual(user);
      //   });
    });
  });
});

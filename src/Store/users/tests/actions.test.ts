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
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "../../appState/types";
import {
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
  appLoading,
} from "../../appState/actions";
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
  verified: false,
};
const credentials: Credentials = { email: "test@test.com", password: "123" };

const mockShowMessageWithTimeout = showMessageWithTimeout(
  "success",
  false,
  "message",
  1500
);

describe("test userFetched and log out", () => {
  describe("if given an object with user info", () => {
    test("should return an object containing payload user info and type FETCH_USER", () => {
      const expected = {
        type: FETCH_USER,
        user,
      };
      expect(userFetched(user)).toEqual(expected);
    });
    test("should return a payload that is the same as user object passed in", () => {
      expect(userFetched(user).user).toEqual(user);
    });
  });

  describe("if logOut is called", () => {
    test("should return a payload object with null payload and type LOG_OUT", () => {
      const expected = {
        type: LOG_OUT,
        user: null,
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
    });

    test("payload should be the same as user object passed for still logged in", () => {
      expect(tokenStillValid(user).user).toEqual(user);
    });
  });
});

jest.mock("../../axios.ts");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("#postLogin", () => {
  describe("when called and success", () => {
    test("should dispatch an action post to log in", async () => {
      const response = user;
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await login(credentials)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      if (response.verified) {
        expect(dispatch(userFetched(response)));
        expect(
          dispatch(
            // @ts-ignore
            showMessageWithTimeout(mockShowMessageWithTimeout)
          )
        );
      } else {
        expect(
          dispatch(
            // @ts-ignore
            showMessageWithTimeout(mockShowMessageWithTimeout)
          )
        );
      }
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      const expectedDispatch = response.verified ? 5 : 4;
      expect(dispatch).toHaveBeenCalledTimes(expectedDispatch);
    });
  });
  describe("when called and failed", () => {
    test("should dispatch an action message", async () => {
      const error = { response: { data: { message: "error" } } };
      const defaultError = { message: "error" };
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await login(credentials)(dispatch, getState);
      if (error.response) {
        expect(
          dispatch(setMessage("error", true, error.response.data.message))
        );
      } else {
        expect(dispatch(setMessage("error", true, defaultError.message)));
      }
      expect(dispatch(appDoneLoading()));
      expect(dispatch).toHaveBeenCalledTimes(5);
    });
  });
});

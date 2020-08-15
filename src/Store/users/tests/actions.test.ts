import axios from "axios";
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
import { AppActions, GetState } from "../../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

const signUpData: SignupData = {
  firstName: "John",
  lastName: "Doe",
  email: "test@test.com",
  password: "123",
  title: "Test title",
  about: "Test about",
};

const credentials: Credentials = { email: "test@test.com", password: "123" };

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

describe("#postLogin", () => {
  describe("when called and a user object is returned", () => {
    test("should dispatch an action post to log in if user.verified === true", async () => {
      const response = { data: user };
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn();
      const getState = jest.fn();
      await login(credentials)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      expect(dispatch).toHaveBeenCalledWith(userFetched(response.data));
      //   expect(dispatch).toHaveBeenCalledWith(
      //     showMessageWithTimeout("success", false, "message", 1500)
      //   );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
    });
    test("should provide user with feedback only if user.verified === false", async () => {
      const response = { data: { ...user, verified: false } };
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn();
      const getState = jest.fn();
      await login(credentials)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      //   expect(dispatch).toHaveBeenCalledWith(
      //     showMessageWithTimeout("info", false, "message", 1500)
      //   );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
  describe("when called and failed", () => {
    test("should dispatch an action message if response is an error", async () => {
      const error = { response: { data: { message: "error" } } };
      const defaultError = { message: "error" };
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await login(credentials)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage("error", true, error.response.data.message)
      );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
    test("should dispatch an action message if request fails", async () => {
      const error = { message: "error" };
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await login(credentials)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage("error", true, error.message)
      );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});

describe("#postSignUp", () => {
  describe("when called and success", () => {
    test("should dispatch user feedback message", async () => {
      const response = "Success";
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await signUp(signUpData)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      //   expect(dispatch).toHaveBeenCalledWith(
      //     showMessageWithTimeout("success", false, "message", 1500)
      //   );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
  describe("when called and failed", () => {
    test("should dispatch an action message if response is an error", async () => {
      const error = { response: { data: { message: "error" } } };
      const defaultError = { message: "error" };
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await signUp(signUpData)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage("error", true, error.response.data.message)
      );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
    test("should dispatch an action message if request fails", async () => {
      const error = { message: "error" };
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await signUp(signUpData)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage("error", true, error.message)
      );
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});

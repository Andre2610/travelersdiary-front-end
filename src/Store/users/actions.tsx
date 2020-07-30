import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../../config/constants";
import {
  AppActions,
  GetState,
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
} from "../StoreTypes/actions";
import { User, NoTokenUser, Credentials, SignupData } from "../../Types/model";
import { selectToken } from "./selector";
import {
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
  appLoading,
} from "../appState/actions";

export const userFetched = (user: User): AppActions => ({
  type: FETCH_USER,
  user,
});

const tokenStillValid = (noTokenUser: NoTokenUser): AppActions => ({
  type: TOKEN_STILL_VALID,
  noTokenUser,
});

export const logOut = (): AppActions => ({ type: LOG_OUT });

export const login = (credentials: Credentials) => {
  const { email, password } = credentials;

  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      dispatch(appLoading());
      const res = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      if (res.data.verified) {
        dispatch(userFetched(res.data));
        const message = `Hello ${res.data.firstName}, welcome back to Traveler's Diary.`;
        dispatch(
          // @ts-ignore
          showMessageWithTimeout("success", false, message, 1500)
        );
      } else {
        console.log("message to verify account");
        const message = `Hello, ${res.data.firstName}, please verify your account by clicking the link sent to your email`;
        dispatch(
          // @ts-ignore
          showMessageWithTimeout("info", false, message, 4000)
        );
      }
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
};
export const signUp = (signUpData: SignupData) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());

    const title = !signUpData.title
      ? `${signUpData.firstName}'s homepage`
      : signUpData.title;
    const about = !signUpData.about
      ? (signUpData.about = "Nothing to say about myself!")
      : signUpData.about;

    const data = { ...signUpData, title, about };
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, {
        data,
      });

      const message = `Welcome to Traveler's Diary ${res.data.firstName}, please make sure to verify your account before logging in.`;
      dispatch(
        // @ts-ignore
        showMessageWithTimeout("success", false, message, 1500)
      );
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
};

export const getUserWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const token = selectToken(getState());

    if (token === null) return;
    dispatch(appLoading());
    try {
      const res = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(res.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
      dispatch(appDoneLoading());
      dispatch(logOut());
    }
  };
};

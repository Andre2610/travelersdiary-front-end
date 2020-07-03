import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../../config/constants";
import { AppActions, GetState, FETCH_USER } from "../StoreTypes/actions";
import { User, Trip, Credentials } from "../../Types/model";

export const userFetched = (user: User): AppActions => ({
  type: FETCH_USER,
  user,
});

// const loginSuccess = (userWithToken) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: userWithToken,
//   };
// };

// const tokenStillValid = (userWithoutToken) => ({
//   type: TOKEN_STILL_VALID,
//   payload: userWithoutToken,
// });

// export const logOut = () => ({ type: LOG_OUT });

export const login = (credentials: Credentials) => {
  const { email, password } = credentials;

  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      console.log("What is my response", res.data);

      dispatch(userFetched(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  title: string,
  about: string
) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        email,
        password,
        title,
        about,
      });

      dispatch(userFetched(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

// export const getUserWithStoredToken = () => {
//   return async (dispatch: Dispatch, getState: GetState) => {
//     // get token from the state
//     const token = selectToken(getState());

//     // if we have no token, stop
//     if (token === null) return;

//     dispatch(appLoading());
//     try {
//       // if we do have a token,
//       // check wether it is still valid or if it is expired
//       const response = await axios.get(`${apiUrl}/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // token is still valid
//       dispatch(tokenStillValid(response.data));
//       dispatch(appDoneLoading());
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.message);
//       } else {
//         console.log(error);
//       }
//       // if we get a 4xx or 5xx response,
//       // get rid of the token by logging out
//       dispatch(logOut());
//       dispatch(appDoneLoading());
//     }
//   };
// };

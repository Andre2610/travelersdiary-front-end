import { User } from "../../Types/model";
import {
  UserActionTypes,
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
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
    default:
      return state;
  }
};

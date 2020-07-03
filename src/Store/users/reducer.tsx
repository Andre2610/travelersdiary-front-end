import { User } from "../../Types/model";
import { UserActionTypes, FETCH_USER } from "../StoreTypes/actions";

const initialState: User = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  token: null,
  title: null,
  about: null,
  trips: [],
};

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case FETCH_USER:
      const token = action.user.token;
      if (token) localStorage.setItem("token", token);
      return { ...state, ...action.user };
    default:
      return state;
  }
};

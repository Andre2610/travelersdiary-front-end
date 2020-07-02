import { User } from "../../Types/model";
import { TripActionTypes } from "../StoreTypes/actions";

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

export default (state = initialState, action: TripActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

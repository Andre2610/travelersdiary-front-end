import reducer from "../reducer";
import { AuthTypes, TripTypes, PostTypes } from "../types";
import { User } from "../../../Types/userTypes";
import {
  FETCH_USER,
  TOKEN_STILL_VALID,
  LOG_OUT,
  ADD_USER_TRIP,
  UPDATE_USER_POSTS,
  UPDATE_USER_TRIPS,
} from "../types";
import { isNull } from "util";

const initialState: User = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  token: null,
  title: null,
  about: null,
  trips: [],
  verified: false,
};
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

describe("when given a FETCH_USER action type", () => {
  test("returns a new state with the payload object", () => {
    const action: AuthTypes = { type: FETCH_USER, user: user };
    const newState = reducer(initialState, action);
    expect(newState).toEqual(user);
  });
  test("returns a new state and the payload object values are correct", () => {
    const action: AuthTypes = { type: FETCH_USER, user: user };
    const newState = reducer(initialState, action);
    expect(newState.firstName).toBe(user.firstName);
    expect(newState.lastName).toBe(user.lastName);
    expect(newState.email).toBe(user.email);
    expect(newState.token).toBe(user.token);
    expect(newState.title).toBe(user.title);
    expect(newState.about).toBe(user.about);
    expect(newState.trips).toBe(user.trips);
    expect(newState.verified).toBe(user.verified);
  });
});

describe("when given a LOG_OUT action type", () => {
  test("returns a new state equal to initial state", () => {
    const action: AuthTypes = { type: LOG_OUT, user: null };
    const newState = reducer(user, action);
    expect(newState).toEqual(initialState);
  });
  test("returns a new state and the payload object values are null", () => {
    const action: AuthTypes = { type: LOG_OUT, user: null };
    const newState = reducer(user, action);
    expect(newState.firstName).toBe(null);
    expect(newState.lastName).toBe(null);
    expect(newState.email).toBe(null);
    expect(newState.token).toBe(null);
    expect(newState.title).toBe(null);
    expect(newState.about).toBe(null);
    // expect(newState.trips).toBe([]);
    // expect(newState.verified).toBe(false);
  });
});

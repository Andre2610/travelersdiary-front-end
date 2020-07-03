import { StoreState } from "../StoreTypes/actions";

export const selectToken = (state: StoreState) => state.user.token;

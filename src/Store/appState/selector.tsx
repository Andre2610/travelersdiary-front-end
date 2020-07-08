import { StoreState } from "../StoreTypes/actions";

export const selectAppLoading = (state: StoreState) => state.appState.loading;
export const selectMessage = (state: StoreState) => state.appState.userMessage;

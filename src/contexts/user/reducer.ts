import { Action, AuthState } from "../types";
import { LOCAL_STORAGE_KEYS } from "../../consts";

let user: any = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER) || "")
  : "";

export const initialState: AuthState = {
  user: user,
};

export const AuthReducer = (
  initialState: AuthState,
  action: Action
): AuthState => {
  switch (action.type) {
    case "REQUEST_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
      };
    case "REQUEST_CLEAN":
      return {
        ...initialState,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

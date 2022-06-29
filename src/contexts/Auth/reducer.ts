import { Action, AuthState } from "../Basic";
import { LOCAL_STORAGE_KEYS } from "../../consts";

let user: any = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER) || "")
  : "";
let token: string = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER) || "")
      .auth_token
  : "";

export const initialState: AuthState = {
  user: user,
  token: token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (
  initialState: AuthState,
  action: Action
): AuthState => {
  switch (action.type) {
    case "REQUEST_SENDING":
      return {
        ...initialState,
        loading: true,
      };
    case "REQUEST_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        token: action.payload.auth_token,
        loading: false,
        errorMessage: null,
      };
    case "REQUEST_CLEAN":
      return {
        ...initialState,
        user: null,
        token: "",
        errorMessage: null,
      };
    case "REQUEST_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

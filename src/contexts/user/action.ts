import React from "react";
import { AuthService } from "../../services";
import { Action } from "../types";
import { LOCAL_STORAGE_KEYS } from "../../commons";

export async function loginUser(
  dispatch: React.Dispatch<Action>,
  signInPayload: any
) {
  try {
    let response = await AuthService.login(signInPayload);
    let data = response.data;

    if (data.userProfile) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.userProfile });
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(data.userProfile)
      );
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.AUTHORITIES,
        JSON.stringify(data.authorities)
      );
      return data.userProfile;
    }
    return;
  } catch (error) {
    throw error;
  }
}

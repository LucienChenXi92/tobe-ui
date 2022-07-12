import React from "react";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { Action } from "../types";
import { LOCAL_STORAGE_KEYS } from "../../consts";

export async function loginUser(
  dispatch: React.Dispatch<Action>,
  signInPayload: any
) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await server.post(
      `${ROOT_URL}${SERVER_URI.LOGIN}`,
      signInPayload,
      requestOptions
    );
    let data = response.data;

    if (data.userProfile) {
      dispatch({ type: "REQUEST_SUCCESS", payload: data.userProfile });
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

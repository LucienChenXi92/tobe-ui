import React from "react";
import server from "../../servers/server";
import { Action, User } from "../Basic";
import { ROOT_URL, LOCAL_STORAGE_KEYS, LOGIN_URI } from "../../consts";

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
    dispatch({ type: "REQUEST_SENDING" });
    let response = await server.post(
      `${ROOT_URL}${LOGIN_URI}`,
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
      return data.userProfile;
    }

    dispatch({ type: "REQUEST_ERROR", error: data.message });
    return;
  } catch (error) {
    dispatch({ type: "REQUEST_ERROR", error: error });
    throw error;
  }
}

export async function updateProfile(
  dispatch: React.Dispatch<Action>,
  user: User
) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: "REQUEST_SENDING" });
    let response = await server.put(
      `${ROOT_URL}/v1/users/${user.id}`,
      user,
      requestOptions
    );
    let data = response.data;

    if (data) {
      dispatch({ type: "REQUEST_SUCCESS", payload: data });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(data)
      );
      return data;
    }
    dispatch({ type: "REQUEST_ERROR", error: data.message });
    return;
  } catch (error) {
    dispatch({ type: "REQUEST_ERROR", error: error });
    throw error;
  }
}

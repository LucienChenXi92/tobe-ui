import React from "react";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { Action, User } from "../Basic";
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
    let response = await server.put(
      `${ROOT_URL}${SERVER_URI.UPDATE_USER}/${user.id}`,
      user,
      requestOptions
    );
    let data = response.data;

    if (data) {
      dispatch({ type: "REQUEST_SUCCESS", payload: data });
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(data)
      );
      return data;
    }
    return;
  } catch (error) {
    throw error;
  }
}

export async function createUser(user: any) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let response = await server.post(
      `${ROOT_URL}${SERVER_URI.CREATE_USER}`,
      user,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }
}

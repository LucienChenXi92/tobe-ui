export const SERVER_URI = {
  LOGIN: "v1/auth/login",
  REFRESH_TOKEN: "v1/auth/refresh",
  GET_USERS: "v1/users",
  CREATE_USER: "v1/users",
  UPDATE_USER: "v1/users",
  DELETE_USER: "v1/users",

  GET_PROJECTS: "v1/project-infos",
  GET_PROJECT_OVERVIEW: "v1/project-infos/overview",
  CREATE_PROJECT: "v1/project-infos",
  UPDATE_PROJECT: "v1/project-infos",
  DELETE_PROJECT: "v1/project-infos",
  GET_PROJECT_PROGRESSES: "v1/project-infos/:projectId/progresses",
  CREATE_PROJECT_PROGRESS: "v1/project-progresses",
  UPDATE_PROJECT_PROGRESS: "v1/project-progresses",
  ACTIVE_PROJECT: "v1/project-infos/active",
  CLOSE_PROJECT: "v1/project-infos/close",
  RELEASE_PROJECT: "v1/project-infos/release",
  GET_NEWS: "v1/news",
};
export const ROOT_URL = process.env.REACT_APP_SERVER_ROOT_URL;

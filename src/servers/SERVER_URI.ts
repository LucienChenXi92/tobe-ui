export const SERVER_URI = {
  LOGIN: "v1/auth/login",
  REFRESH_TOKEN: "v1/auth/refresh",
  GET_USERS: "v1/users",
  GET_USER_BRIEF_PROFILE: "v1/users/brief-profile",
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
  ACTIVE_PROJECT: "v1/project-infos/:projectId/active",
  CLOSE_PROJECT: "v1/project-infos/:projectId/close",
  RELEASE_PROJECT: "v1/project-infos/:projectId/release",

  GET_ARTICLES: "v1/article-infos",
  CREATE_ARTICLE: "v1/article-infos",
  UPDATE_ARTICLE: "v1/article-infos",
  DELETE_ARTICLE: "v1/article-infos",
  RELEASE_ARTICLE: "v1/article-infos/:articleId/release",
  GET_ARTICLE_OVERVIEW: "v1/article-infos/overview",

  GET_NEWS: "v1/news",
  GET_NEWS_ARTICLES: "v1/news/articles",
  GET_NEWS_PROJECTS: "v1/news/projects",

  GET_NEWS_TOP_5_ACTIVE_USERS: "v1/news/top5-active-users",
  GET_TAG_STATISTICS: "v1/news/tag-statistics",

  GET_TAGS: "v1/tags",
  CREATE_TAG: "v1/tags",
};
export const ROOT_URL = process.env.REACT_APP_SERVER_ROOT_URL;

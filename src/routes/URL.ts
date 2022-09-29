export const URL = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_OUT: "/sign-out",
  SIGN_UP: "/sign-up",
  ARTICLE: "/article",
  ABOUT: "/about",
  NEWS: "/news",
  NEWS_DETAIL: "/news/:projectId",

  MY_ZONE: "/my/dashboard",
  DASHBOARD: "/my/dashboard",
  PROFILE: "/my/profile",
  USERS: "/my/users",
  PROJECTS: "/my/projects",
  PROJECT_DETAIL: "/my/projects/:projectId",
  CREATE_PROJECT: "/my/projects/create-project",
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) > 0;
}

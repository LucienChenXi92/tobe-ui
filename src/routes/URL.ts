export const URL = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_OUT: "/sign-out",
  SIGN_UP: "/sign-up",
  BLOG: "/blog",
  ABOUT: "/about",
  NEWS: "/news",

  MY_ZONE: "/my/dashboard",
  DASHBOARD: "/my/dashboard",
  PROFILE: "/my/profile",
  USERS: "/my/users",
  PROJECTS: "/my/projects",
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) > 0;
}

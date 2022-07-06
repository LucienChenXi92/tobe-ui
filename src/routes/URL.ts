export const URL = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_OUT: "/sign-out",
  SIGN_UP: "/sign-up",
  BLOG: "/blog",
  ABOUT: "/about",
  NEWS: "/news",

  PROFILE: "/my/profile",
  DASHBOARD: "/my/dashboard",
  USERS: "/my/dashboard/users",
  PROJECTS: "/my/dashboard/projects",
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) > 0;
}

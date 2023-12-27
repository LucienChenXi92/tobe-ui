import * as TimeFormat from "./TimeFormat";

export const LOCAL_STORAGE_KEYS = {
  CURRENT_USER: "currentUser",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  AUTHORITIES: "authorities",
};

export enum AUTHORITY {
  ROLE_BASIC = "ROLE_BASIC",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_GUEST = "ROLE_GUEST",
}

export enum FEATURE_CODE {
  articleModule = "articleModule",
  projectModule = "projectModule",
  vocabularyModule = "vocabularyModule",
}

export type FeatureCode = keyof typeof FEATURE_CODE;
export type Authority = keyof typeof AUTHORITY;

export function authed(requiredRole?: string[]): boolean {
  const userAuthorities = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORITIES) || "[]"
  );
  // if no role required, then return true directly
  if (requiredRole) {
    let isValid: boolean = false;
    // iteritor all user's authority to see if any could match
    userAuthorities?.forEach((a: { authority: string }) => {
      if (requiredRole.indexOf(a.authority) > -1) {
        isValid = true;
        return;
      }
    });
    return isValid;
  }
  return true;
}

export function enabled(requiredFeature?: FeatureCode): boolean {
  const userProfile = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER) || "{}"
  );
  // if no feature code required, then return true directly
  if (!requiredFeature) {
    return true;
  }
  return userProfile?.features?.[requiredFeature] === true;
}

export function formatDate(time: string) {
  return time.substring(0, time.indexOf("T"));
}

export { TimeFormat };

export const URL = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_OUT: "/sign-out",
  SIGN_UP: "/sign-up",
  ARTICLE: "/article",
  ABOUT: "/about",
  NEWS: "/news",
  NEWS_PROJECT_DETAIL: "/news/projects/:projectId",
  NEWS_ARTICLE_DETAIL: "/news/articles/:articleId",

  MY_ZONE: "/my/dashboard",
  DASHBOARD: "/my/dashboard",
  PROFILE: "/my/profile",
  USERS: "/my/users",
  PROJECTS: "/my/projects",
  PROJECT_DETAIL: "/my/projects/:projectId",
  CREATE_PROJECT: "/my/projects/create-project",

  ARTICLES: "/my/articles",
  ARTICLE_DETAIL: "/my/articles/:articleId",
  CREATE_ARTICLE: "/my/articles/create-article",

  CREATE_COLLECTION: "/my/collections/create-collection",
  COLLECTION_DETAIL: "/my/collections/:collectionId",
  COLLECTIONS: "/my/collections",
};

export function validateUrl(target: string): boolean {
  return Object.values(URL).indexOf(target) >= 0;
}
